import Taro, { Component } from '@tarojs/taro'
import { View, Text, RadioGroup, Radio, Input, Button } from '@tarojs/components'

import './publish.scss'

class Publish extends Component {
  constructor(props) {
    super(props)
    this.staticData = {
      type: 'sell'
    }
  }

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

  radioChange(e) {
    this.staticData.type = e.detail.value
  }

  handleMessageInput(e) {
    this.staticData.message = e.detail.value
  }

  handleContactInput(e) {    
    this.staticData.contact = e.detail.value
  }

  handleAddrTap() {
    Taro.chooseLocation({
      success: (result) => {
        this.setState({
          address: result.address
        })

        this.staticData.longitude = result.longitude
        this.staticData.latitude = result.latitude
      }
    })
  }

  showToast(title) {
    Taro.showToast({
      title,
      icon: 'none',
      duration: 2000
    })
  }

  handleSubmitTap() {
    if (this.state.address === '点击选择，要勾选哦~') {
      this.showToast('请选择地址')
      return;
    }

    if (!this.staticData.message) {
      this.showToast('请填写说明')
      return;
    }

    if (!this.staticData.contact) {
      this.showToast('请填写联系方式')
      return;
    }

    // address，latitude，longitude，message，contact，type（sell，buy）
    let data = {
      address: this.state.address,
      ...this.staticData
    }

    // 数据提交
    Taro.request({
      url: 'https://ik9hkddr.qcloud.la/index.php/trade/add_item', //仅为示例，并非真实的接口地址
      data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => {
        if (res.data.ret) {
          this.setState({
            isSuccess: true
          })
        } else {
          this.setState({
            isSuccess: false
          })
        }

        this.setState({
          isSubmit: true
        })
      },
      fail() {
        this.setState({
          isSuccess: false,
          isSubmit: true
        })
      }
    })
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
                  <View className="content" onTap={this.handleAddrTap.bind(this)}>{this.state.address}</View>
                </View>
                <View className="item">
                  <View className="label">类型</View>
                  <View className="content">
                    <RadioGroup className="radio-group" onChange={this.radioChange.bind(this)}>
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
                    <Input onInput={this.handleMessageInput.bind(this)} className="weui-input" placeholder="请输入说明" />
                  </View>
                </View>
                <View className="item">
                  <View className="label">联系方式</View>
                  <View className="content">
                    <Input onInput={this.handleContactInput.bind(this)} className="weui-input" placeholder="请输入联系方式" />
                  </View>
                </View>

                <View className="button">
                  <Button onTap={this.handleSubmitTap.bind(this)}> 发布信息 </Button>
                </View>
              </View>
              )
            : (
              <notify onCommit={(e) => this.setState({isSubmit: e.detail})} isSuccess={this.state.isSuccess}></notify>
            )
        }
      </View>
    )
  }
}

export default Publish