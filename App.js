import React from 'react';
import { StyleSheet,
Text,
Dimensions,
View,
FlatList,
Image,
TouchableHighlight,
TouchableOpacity } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Footer extends React.Component {
  myscrollToIndex(index){
    if (this.props.reflist) {
      this.props.reflist.scrollToIndex({
        animated: true,
        index: index,
        viewPosition: 0.5});
    }
  };

  render() {
    steps = []
    superi = this.props.index
    myindex = 0
    this.props.form.map(function(item){
      if (item) {
        if (superi == myindex){
          steps.push({item: item, color: 'blue'})
        } else if (item.clicked) {
          steps.push({item: item,color: 'green'})
        } else {
          steps.push({item: item, color: 'grey'})
        }
        myindex++
      }
    })

    return (
      <View style={styles.footer}>
        <View style={[styles.footerLine, {width: 36*steps.length}]}></View>
        { steps.map(function(object, i){
            if (object.color == 'grey'){
              return(
                <View key={i}>
                  <TouchableOpacity key={i} onPress={() => this.myscrollToIndex(i)}>
                  <View style={[styles.dots, {backgroundColor: 'grey'}]}>
                  </View>
                  </TouchableOpacity>
                </View>)
            } else if (object.color == 'green') {
              return(
                <View key={i}>
                  <TouchableOpacity key={i} onPress={() => this.myscrollToIndex(i)}>
                  <View style={[styles.dots, {backgroundColor: 'green'}]}>
                  </View>
                    </TouchableOpacity>
                </View>)
            } else {
              return(
                <View key={i}>
                <View style={[styles.dots, {backgroundColor: 'steelblue'}]}>
                </View>
                </View>)
            }
          }, this)
        }
     </View>
    )
  }
}

class Form extends React.Component {
  state = {
    index: 0,
    update: true,
  };

  myscrollToIndex = () => {
    this.setState({index: this.state.index += 1});
    this.flatListRef.scrollToIndex({animated: true,index: this.state.index, viewPosition: 0.5},
    );
  };

  _finishFormVal = () => {
    //make some sort of validations here for all your answers
    alert('You finished this form and you are being redirected')
  }

  _changeStatus = (item) => {
    item.clicked ? item.clicked = false : item.clicked = true
    this.setState({update: !this.state.update}) // this signals Flatlist to rerender
  }

  _renderItem = ({item}) => {
    count = (this.props.form.length - 1) //will compare to index which is always 1 less
    return (
      <View key={item.id} style={[styles.flatListContainer, {backgroundColor: item.color}]}>
      <TouchableHighlight onPress={() => {this._changeStatus(item)}}>
        <View>
          <Text style={[styles.text, item.clicked ? {backgroundColor: 'green'} : {backgroundColor: 'grey'}]}>
            I am question {item.id + "\n"}
            Click on me to activate or disactivate me
          </Text>
        </View>
      </TouchableHighlight>

      <TouchableOpacity
      onPress={(count === this.state.index) ? this._finishFormVal : this.myscrollToIndex}
      style={styles.buttonNext}>
        <Text>Next</Text>
      </TouchableOpacity>
      </View>
    )
  }

  handleScroll = (event: Object) => {
    newindex = Math.floor(event.nativeEvent.contentOffset.y / height)
    this.setState({index: newindex})
  }

  _keyExtractor = (item, index) => item.id;

  render () {
    return (
      <View>
        <FlatList
          getItemLayout={(data, index) =>
            ({length:(height), offset: (height) * index, index}
          )}
          horizontal={false}
          ref={(ref) => { this.flatListRef = ref; }}
          scrollEnabled
          onScroll={this.handleScroll}
          keyboardShouldPersistTaps={"always"}
          data={this.props.form}
          extraData={this.props.form}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          keyboardDismissMode={'on-drag'}
          />
        <View style={styles.footer}>
            <Footer
              reflist={this.flatListRef}
              answers={this.props.answers}
              form={this.props.form}
              index={this.state.index}/>
        </View>
      </View>
    )
  }
}

export default class App extends React.Component {
  render() {
    formData = [
        {id: 1, color: 'skyblue', clicked: false},
        {id: 2, color: 'lightgreen', clicked: false},
        {id: 3, color: 'steelblue', clicked: false},
        {id: 4, color: 'green', clicked: false},
        {id: 5, color: 'powderblue', clicked: false},
        {id: 6, color: 'powderblue', clicked: false},
    ]
    return (
      <View style={styles.container}>
        <Form form={formData}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    display: 'flex',
    alignItems: 'center'
  },
  white: {
      backgroundColor: "white"
  },
  flatListContainer: {
    backgroundColor: 'green',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: height,
    overflow: 'visible',
    width: width,
  },
  footer: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
  },
  footerLine: {
    position: 'absolute',
    height: 1,
    borderColor: 'darkgrey',
    borderWidth: 1,
    marginHorizontal: 40,
  },
  dots: {
    width: 20,
    borderRadius: 10,
    height: 20,
    margin: 13,
  },
  text: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    textAlign: 'center'
  },
  buttonNext: {
    top: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 150,
    borderRadius: 75,
    backgroundColor: 'lightgrey'
  }
});
