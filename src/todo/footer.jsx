// .vue文件是识别成html文件，jsx是react中的写法，将html写在js中
import '../assets/styles/footer.styl' // jsx中不能写style，只能外部引入
export default {
  data() {
    return {
      author: 'XuYu'
    }
  },
  render() {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}