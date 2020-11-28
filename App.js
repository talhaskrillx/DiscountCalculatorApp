import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,

} from 'react-native';


const App = () => {



  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrc, setDicountPrc] = useState("");
  const [savedAmount, setSavedAmount] = useState("0.00");
  const [finalPrice, setFinalPrice] = useState("0.00");

  const [calError, setCalError] = useState("");

  const [history, setHistory] = useState([""]);
  const [modalVisible, setModalVisible] = useState(false);


  calculateDiscount = () => {
    if (discountPrc <= 100 && discountPrc >= 0 && originalPrice >= 0) {
      var saved = (originalPrice * discountPrc) / 100;
      var final_Price = originalPrice - saved;
      setSavedAmount(saved.toFixed(2));
      setFinalPrice(final_Price.toFixed(2));
      setCalError("")
    } else if (discountPrc > 100) {
      setCalError("Discount Cannot be greater than 100%");
    } else if (originalPrice < 0 || discountPrc < 0) {
      setCalError("Original Price or Discount Price can't be 0");
    }
  }

  saveResult = () => {
    var space = " -- ";
    var result = "Rs: " + originalPrice + space + discountPrc + space + "Rs: " + finalPrice;
    console.log(result);
    setHistory(oldHistory => [...history, result]);

    setOriginalPrice("");
    setDicountPrc("");
  }

  viewHistory = () => {
    setModalVisible(true);
  }

  return (
    <View style={{ flex: 1 }}>

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTexts}> Discount Calulator </Text>
        </View>
      </View> 



      <View style={styles.mainView}>
        <TextInput keyboardType={"number-pad"} value={originalPrice} onChangeText={(orgPrice) => setOriginalPrice(orgPrice)} style={styles.textFields} placeholder={"$ Price"} />
        <View style={{ paddingTop: 10 }} />
        <TextInput keyboardType={"number-pad"} value={discountPrc} onChangeText={(discountPercentage) => setDicountPrc(discountPercentage)} style={styles.textFields} placeholder={"% Discount"} />
        <View style={{ paddingTop: 20 }} />
        <TouchableOpacity onPress={() => calculateDiscount()} style={styles.calcBtn}>
          <Text style={styles.calcBtnText}>Calculate</Text>
        </TouchableOpacity>
        <View style={{ paddingTop: 10 }} />
        <Text style={{ fontSize: 15, color: 'red' }}>{calError}</Text>
        <View style={{ paddingTop: 10 }} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.Fprice}> New Price </Text>
         
          <Text style={styles.Fprice}>Saved money</Text>

        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.finalPriceText}>{finalPrice}</Text>
          <Text style={[styles.finalPriceText, ]}> {savedAmount}</Text>
        </View>
        <View style={{ paddingTop: 15 }} />
        <TouchableOpacity onPress={() => saveResult()} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save Data</Text>
        </TouchableOpacity>
        <View style={{ paddingTop: 10 }} />
        <TouchableOpacity onPress={() => viewHistory()} style={styles.historyBtn}>
          <Text style={styles.historyBtnText}>View History</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            window.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeading}>Discount History</Text>
              <Text style={styles.firstIndexHistoryText}>Actual Price ~ Discount % ~ Discount Price</Text>
              <FlatList

                data={history}
                renderItem={({ item }) => { return <Text style={styles.listTextItem}>{item}</Text> }}
                keyExtractor={(index) => { return index }} />

              <TouchableOpacity
                style={{ ...styles.closeHistory, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  
  header: {
    width: 230,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

  },
  headerTexts: {
    fontWeight: "bold",
    fontSize: 20,
    fontStyle: "italic",
    letterSpacing: 4,
    
    paddingLeft : 110,
  },
  
  
  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeHistory: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    width: 100,
    height: 30,
    elevation: 2,
    justifyContent: 'center'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  firstIndexHistoryText: {
    fontSize: 18,
  },

  headerText: {
    fontSize: 24,
    color: 'white'
  },
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  textFields: {
    width: "80%",
    borderColor: "black",
    borderBottomEndRadius : 100,
    borderBottomWidth : 20,
    borderWidth: 4,
    borderRadius: 20,
    fontSize: 20,
    color: "blue",
    padding: 20,
    marginBottom: 10,
  },
  calcBtn: {
    height: 40,
    width: 120,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    elevation: 2,
  },
  calcBtnText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
   

   

  },
  Fprice: {
    fontSize: 18,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    
  },
  finalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: 'center',
    paddingHorizontal: 51,

  },
  saveBtn: {
    height: 35,
    width: 150,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 2,
  },
  saveBtnText: {
    fontSize: 22,
    color: 'black',
    backgroundColor : "white",
    fontWeight: "bold",
  },

  historyBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyBtnText: {
    fontSize: 18,
    color: '#566573'
  },
  listTextItem: {
    fontSize: 18
  },

});


<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 3bd9871bdc6b9accbabe1b9bf722e816610e68cc
