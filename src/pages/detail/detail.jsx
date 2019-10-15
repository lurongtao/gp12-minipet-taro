import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

class Detail extends Component {
  state = {
    address: '',
    type: '',
    message: '',
    contact: ''
  }

  componentDidMount() {
    Taro.request({
      url: 'https://ik9hkddr.qcloud.la/index.php/trade/get_item',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: this.$router.params.id
      },
      success: (res) => {
        this.setState(res.data.data)
      }
    })
  }

  handleBackTap() {
    Taro.navigateBack({})
  }

  render() {
    return (
      <View class="pub-container">
        <View class="item">
          <View class="label">我的地址</View>
          <View class="content">{this.state.address}</View>
        </View>
        <View class="item">
          <View class="label">类型</View>
          <View class="content">
            {this.state.type}
          </View>
        </View>
        <View class="item">
          <View class="label">说明</View>
          <View class="content">
            {this.state.message}
          </View>
        </View>
        <View class="item">
          <View class="label">联系方式</View>
          <View class="content">
            {this.state.contact}
          </View>
        </View>

        <View class="button">
          <Button onTap={this.handleBackTap}> 返回 </Button>
        </View>
      </View>
    )
  }
}

export default Detail