import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'

import './search.scss'

class Search extends Component {
  state = {
    results: []
  }

  handleBlur(e) {
    this.doSearch(e.detail.value)
  }

  doSearch(keyword) {
    Taro.request({
      url: 'https://ik9hkddr.qcloud.la/index.php/trade/get_search_list',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        keyword
      },
      success: (ret) => {
        this.setState({
          results: ret.data.data
        })
      }
    })
  }
  
  render() {
    return (
      <View class="search-container">
        <AtSearchBar
          onBlur={this.handleBlur.bind(this)}
        ></AtSearchBar>
          <ScrollView scroll-y="true" className="result">
            {
              this.state.results.map((value) => {
                return (
                  <View className="item" key={value.id}>
                    <View className="address">
                        <Text>{value.address}</Text>
                    </View>
                    <View className="message">
                      <Text>{value.message}</Text>
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
      </View>
    )
  }
}

export default Search