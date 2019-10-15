import Taro, { Component } from '@tarojs/taro'
import { View, Text, RadioGroup, Radio, Input, Button } from '@tarojs/components'

import './publish.scss'

class Publish extends Component {
  state = {
    address: '点击选择，要勾选哦~',
    isSubmit: false,
    isSuccess: false
  }

  config = {
    usingComponents: {
      'notify': '../notify/notify'
    }
  }

  render() {
    return (
      <View>
        {
          !this.state.isSubmit
            ? (
            <View className="pub-container">
              <View className="item">
                <View className="label">我的地址</View>
                <View className="content" bindtap="handleAddrTap">{this.state.address}</View>
              </View>
              <View className="item">
                <View className="label">类型</View>
                <View className="content">
                  <RadioGroup className="radio-group" bindchange="radioChange">
                    <Radio value="buy" checked={true} className="radio">
                      <Text>求购</Text>
                    </Radio>
                    <Radio value="sell" className="radio">
                      <Text>转让</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View className="item">
                <View className="label">说明</View>
                <View className="content">
                  <Input bindinput="handleMessageInput" className="weui-input" placeholder="请输入说明" />
                </View>
              </View>
              <View className="item">
                <View className="label">联系方式</View>
                <View className="content">
                  <Input bindinput="handleContactInput" className="weui-input" placeholder="请输入联系方式" />
                </View>
              </View>

              <View className="button">
                <Button bindtap="primary" bindtap="handleSubmitTap"> 发布信息 </Button>
              </View>
            </View>
            )
          : (
            <notify></notify>
          )
        }
      </View>
    )
  }
}

export default Publish