import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

import './detail.scss'

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
      <View className="pub-container">
        <View className="item">
          <View className="label">我的地址</View>
          <View className="content">{this.state.address}</View>
        </View>
        <View className="item">
          <View className="label">类型</View>
          <View className="content">
            {this.state.type}
          </View>
        </View>
        <View className="item">
          <View className="label">说明</View>
          <View className="content">
            {this.state.message}
          </View>
        </View>
        <View className="item">
          <View className="label">联系方式</View>
          <View className="content">
            {this.state.contact}
          </View>
        </View>

        <View className="button">
          <Button onTap={this.handleBackTap}> 返回 </Button>
        </View>
      </View>
    )
  }
}

export default Detail