/** @flow */
// React
import React, { Component } from 'react'

// React Native
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native'

// Redux
import { connect }                                             from 'react-redux'
import { handleInput, fetchCategories, fetchItemsForCategory } from '../../store/modules/core/actions'

// Utils
import { getKeyByValue } from '../../common/utils'

// Data
import { FIELDS, ROUTES } from '../../common/data'

class CategoryOverviewScreen extends Component {

  componentWillMount() {
    this.props.fetchCategories()
  }

  /**
   * Set the input data for the selectedCategory
   * fetch all the items that we want to use on the next screen
   * navigate to next screen
   * @param category
   */
  onPressListItem = (category: string) => {
    const {handleInput, navigation, fetchItemsForCategory} = this.props

    handleInput(FIELDS.selectedCategory, category)

    fetchItemsForCategory({category})

    navigation.navigate(ROUTES.ItemsOverview)
  }

  renderListItem = ({item}) => {
    const category = getKeyByValue(this.props.categories, item)
    return (
        <TouchableOpacity onPress={() => this.onPressListItem(category)}>
          <Text style={styles.item}>{category}</Text>
        </TouchableOpacity>
    )
  }

  render() {
    const {loading, categories} = this.props
    const list                  = Object.values(categories)

    return (
        <View style={{flex: 1}}>
          <Text style={styles.title}>Star Wars Categories</Text>

          {(loading && list.length === 0) && <Text>Loading...</Text>}

          <FlatList
              data={list}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderListItem}
          />
        </View>
    )
  }

}


const styles = StyleSheet.create({
  title: {
    fontSize:  18,
    textAlign: 'center'
  },

  item: {
    padding:  10,
    fontSize: 18,
    height:   44
  }
})


function mapStateToProps(state) {
  return {
    categories: state.core.categories,
    loading:    state.core.loading
  }
}

const mapDispatchToProps = {
  handleInput,
  fetchCategories,
  fetchItemsForCategory
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryOverviewScreen)
