
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';

const App = () => {
  const [discountP, setDicountP] = useState('');
  const [originalP, setOriginalP] = useState('');
  const [finalP, setFinalP] = useState('0.00');
  const [savedAmount, setSavedAmount] = useState('0.00');
  const [calculateError, setCalculateError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [history, setHistory] = useState(['']);

  viewHistory = () => {
    setModalVisible(true);
  };

  saveResult = () => {
    var space = '  ';
    var result =
      '$: ' + originalP + space + discountP + '% ' + space + '$: ' + finalP;
    setHistory((oldHistory) => [...history, result]);

    setOriginalP('');
    setDicountP('');
  };

  calculateDiscount = () => {
    if (discountP <= 100 && originalP >= 0 && discountP >= 0) {
      var savedPrice = (originalP * discountP) / 100;
      var final_Price = originalP - savedPrice;
      setFinalP(final_Price.toFixed(3));
      setSavedAmount(savedPrice.toFixed(3));
      setCalculateError('');
    } else if (discountP > 100) {
      setCalculateError('Discount > 100 %');
    } else if (originalP <= 0 || discountP <= 0) {
      setCalculateError('Price cannot be less than 0');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Discount Calculator App</Text>
      </View>
      <View style={styles.mainView}>
        <TextInput
          keyboardType={'number-pad'}
          value={originalP}
          onChangeText={(orgPrice) => setOriginalP(orgPrice)}
          style={styles.textFields}
          placeholder={'Enter Original Price'}
        />
        <View style={{ paddingTop: 10 }} />
        <TextInput
          keyboardType={'number-pad'}
          value={discountP}
          onChangeText={(discountPercentage) => setDicountP(discountPercentage)}
          style={styles.textFields}
          placeholder={'Enter Discount %'}
        />
        <View style={{ paddingTop: 10 }} />
        <Button
          title="Calculate Discount"
          onPress={() => calculateDiscount()}
          style={styles.calculateButton}></Button>
        <Button
          title="Save Results"
          onPress={() => saveResult()}
          style={styles.saveBtn}></Button>
        <View style={{}} />
        <Text style={{ fontSize: 15, color: 'blue' }}>{calculateError}</Text>
        <View style={{}} />
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.resultText}>Final Price:</Text>
          <Text style={styles.finalPriceText}> $ {finalP}</Text>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.resultText}>You Saved :</Text>
          <Text style={[styles.finalPriceText, { color: 'orange' }]}>
            {' '}
            $ {savedAmount}
          </Text>
        </View>
        <View style={{ paddingTop: 5 }} />

        <View style={{ paddingTop: 5 }} />
        <Button
          title="Past Discount"
          onPress={() => viewHistory()}
          style={styles.historyBtn}></Button>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {}}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeading}>Past Discount</Text>
              <Text style={styles.firstIndexHistoryText}>
                Original Price Discount% Final Price
              </Text>
              <FlatList
                data={history}
                renderItem={({ item }) => {
                  return <Text style={styles.listTextItem}>{item}</Text>;
                }}
                keyExtractor={(index) => {
                  return index;
                }}
              />

              <Button
                title="Close"
                style={{ ...styles.closeHistory }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}></Button>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeHistory: {
    backgroundColor: '#F194FF',
    borderRadius: 5,
    width: 100,
    height: 50,
    elevation: 2,
    justifyContent: 'center',
  },

  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  firstIndexHistoryText: {
    fontSize: 18,
  },
  header: {
    backgroundColor: 'white',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    color: 'black',
  },
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    flex: 1,
  },
  textFields: {
    borderColor: 'black',
    paddingLeft: 60,
    borderWidth: 2,

    fontSize: 18,
    height: 40,
    width: 280,
  },
  calculateButton: {
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 160,
  },

  resultText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  finalPriceText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  saveBtn: {
    height: 35,
    width: 150,
    backgroundColor: '#388E3C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  historyBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  listTextItem: {
    fontSize: 18,
  },
});

export default App;
