Component({
  properties: {
    isSuccess: {
      type: Boolean
    }
  },

  methods: {
    handleBackHomeTap() {
      wx.navigateBack({})
    },
  
    handleBackSubmitTap() {
      this.triggerEvent('commit', false)
    }
  },
})