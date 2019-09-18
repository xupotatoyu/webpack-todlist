const path = require('path') // path是js的一个基本包。用来处理路径
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //将非js代码的部分单独打包成静态资源文件，单独做浏览器缓存

// 在package中设置的NODE_ENV的值都保存在process.env.NODE_ENV中
const isDev = process.env.NODE_ENV === 'development' // 判断变量

// 首先输入index.js,并将index相关的依赖vue和APP组件等打包成一个完整的bound.js文件
// bound.js是可以在浏览器中直接运行的代码
const config = {
    target: 'web',  //编译目标是web平台

    // 输入 
    entry: path.join(__dirname,'src/index.js'), // _dirname代表这个文件所在的路径，也就是根路径 
                                                // join相当于把两个路径拼接在一起，形成一个完整的绝对路径
    output: {  // 输出
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {         
                test: /\.vue$/,  // test检测文件类型
                loader: 'vue-loader' // loader：载入程序
            },
            {         
                test: /\.jsx/,  // jsx文件
                loader: 'babel-loader' 
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //     'style-loader', // 处理读出的css，将其转变为js代码
            //     'css-loader'    // 读出css文件内容
            //     ]
            // },
            // {
            //     test: /\.styl/,
            //     use: [           
            //         'style-loader', //由style-loader处理写入js
            //         'css-loader',   // =>css-loader读出css内容
            //         {
            //             loader: 'postcss-loader', // stylus-loader会生成sourceMap，postcss也会生成source,当前面的处理器已经生成sourceMap后可以直接调用
            //             options: {
            //               sourceMap: true
            //             }
            //         },
            //         'stylus-loader', // stylus 样式预处理 stylus-loader 处理完变成css 
            //     ]
            // },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [  
                    {   // url-loader依赖于file-loader
                        loader: 'url-loader', // url-loader: 帮我们把图片转为base64代码,  将图片转为base64代码直接写在js文件中，就不需要另外的文件
                        options: {            // options指定loader的操作方式，loader的相关配置 
                            limit: 1024,
                            name: '[name]-123.[ext]' //输出文件原本的名字和扩展名 [name].[ext]
                        }
                    }
                ]
            }
        ]
    },
    // 数组，可以有多个组件
    plugins: [
        // 在webpack编译的过程中以及在写js代码的时候去判断环境
        // 根据不同的环境去打包
        new webpack.DefinePlugin({
            'process.env' : {
               NODE_ENV: isDev ?  '"development"' : '"production"' // 记得单引号内加双引号
            }
        }),
        new HTMLPlugin(),
        new VueLoaderPlugin()
    ]
}

// 判断不同的环境
if(isDev){
    config.module.rules.push(
        {
            test: /\.styl/,
            use: [
                'style-loader',                     //将css写入到html中去
                'css-loader',                       //css-loader处理css
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,            //stylus-loader和postcss-loader自己都会生成sourceMap,如果前面stylus-loader已生成了sourceMap
                    }                               //那么postcss-loader可以直接引用前面的sourceMap
                },
                'stylus-loader'                     //处理stylus的css预处理器的问题件,转换成css后,抛给上一层的css-loader
            ]
        }
    )      
    config.devtool = '#cheap-module-eval-source-map' // 线上显示会使用编译后的代码不易调试 加上此配置后可以在线上显示原本的代码，便于调试
    config.devServer = {
        port: '8000',
        host: '0.0.0.0',    // 可以设置不同的host，0.0.0.0的好处是可以通过本机ip访问
        overlay:{
            errors: true    // webpack在编译中有任何的错误都打印到网页中
        },

    //    historyFallback: {},  // 入口地址映射
    //    open: true,// 在启动服务的时候自动打开浏览器
    //    hot: true  // 热更新
    } 
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}else {
    config.output.filename = '[name].[chunkhash:8].js'  //此处一定是chunkhash,因为用hash时app和vendor的hash码是一样的了,这样每次业务代码更新,vendor也会更新,也就没有了意义.
    let extractLoader = {
        loader: MiniCssExtractPlugin.loader,
        options: {}
    }

    config.module.rules.push({
        test: /\.styl/,
         use: [
            extractLoader,
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
    })
    config.plugins.push(
        new MiniCssExtractPlugin({
            //filename: "css/[name].[chunkhash:8].css"
            filename: "[name].[chunkhash:8].css"
        })
    )
}

module.exports = config