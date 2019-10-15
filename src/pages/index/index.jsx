import Taro, { Component } from '@tarojs/taro'
import { View, Button, CoverImage, Text, Map, CoverView, Image, Navigator } from '@tarojs/components'
import _ from 'lodash'

import './index.scss'

import pin from '../../resources/pin.png'
import center from '../../resources/center.png'
import buy from '../../resources/buy.png'
import sell from '../../resources/sell.png'

class Index extends Component {
  state = {
    longitude: 0,
    latitude: 0,
    markers: []
  }

  config = {
    "usingComponents": {}
  }

  componentDidMount() {
    Taro.getLocation({
      type: 'wgs84'
    }).then((result) => {
      this.setState({
        latitude: result.latitude,
        longitude: result.longitude
      })
    })

    Taro.request({
      url: 'https://ik9hkddr.qcloud.la/index.php/trade/get_list',
      success: this.loadData.bind(this)
    })
  }

  loadData(res) {
    let markers = []

    res.data.data.map(value => {
      markers.push({
        id: value.id,
        latitude: value.latitude,
        longitude: value.longitude,
        iconPath: value.type === 'buy' ? buy : sell
      })
    })

    this.setState({
      markers
    })
  }

  handeMarkerTap(e) {
    Taro.navigateTo({
      url: '/pages/detail/detail?id=' + e.markerId
    })
  }

  render() {
    return (
      <View className="index-container">
        <View>
          <Map id="map" markers={this.state.markers} onMarkertap={this.handeMarkerTap} longitude={this.state.longitude} latitude={this.state.latitude} scale="16" show-location>
            <CoverView className="icon-nav" bindtap="handleNavTap">
              {/* {process.env.TARO_ENV === 'weapp' ? <cover-image src={center}></cover-image> : <Image src={center}></Image>} */}
              <CoverImage src={center}></CoverImage>
            </CoverView>
            <CoverView className="icon-loc">
              {/* {process.env.TARO_ENV === 'weapp' ? <cover-image src={pin}></cover-image> : <Image src={pin}></Image>} */}
              <CoverImage src={pin}></CoverImage>
            </CoverView>
          </Map>
        </View>

        <View>
          <Navigator open-type="navigateTo" url="/pages/publish/publish">
            <View className="publish">发布</View>
          </Navigator>
          <Navigator open-type="navigateTo" url="/pages/search/search">
            <View className="search">搜索</View>
          </Navigator>
        </View>
      </View>
    )
  }
}

export default Index
