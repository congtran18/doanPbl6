
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Image, ScrollView} from 'react-native';
import products from '../components/products';
import { ScreenContainer } from 'react-native-screens';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
const plus = () => {
        alert('add');
    }
    const sub = () => {
          alert('reduce');
    }
    const HistoryCard  = ({item}) => {
        return(
            <View style={styles.containers}> 
            <View  style={styles.displayFlexRow}>   
            <Image 
                style={styles.imageStyle}
                source={item.img}
            />
            <View style={styles.boxLeft}>
                <Text style={styles.nameProduct}> {item.name}</Text>
                <Text> {item.about}  </Text>
                <Text style={styles.sizeStyle}> Size: M | Màu: Đen </Text>
                <Text style={styles.priceStyle}> {item.price} </Text>
                <View style={styles.displayFlexRow2}>
                    <Text style={{textTransform:'capitalize'}}> Tổng: </Text>
                    <TextInput style={styles.inputSubStyle} value={item.price}/>
                </View>
               
            </View>
            
            </View>
            <View style={styles.boxRight}> 
                <Text style={{textTransform:"capitalize"}}> số lượng: </Text>
                <TextInput style={styles.inputStyle} value="1"/>
            </View>
            <View style={styles.displayFlexRow2, {marginBottom: 5, marginTop: 5}}>
                    <Text style={{textTransform:'capitalize'}}> Trạng thái: </Text>
                    <Text style={{fontWeight:'bold'}}>   Chờ xác nhận </Text>
                </View>
            <View style={styles.displayFlexRow2}>
                    <Text style={{textTransform:'capitalize'}}> Ngày: </Text>
                    <Text>   12/05/2021 </Text>
            </View>
               
          </View>
        )
      
    };
const  History = () => {
  return (
    <SafeAreaView>
      <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 10}} > History </Text>
      {/* <ScrollView style={styles.scrollViewStyle}> */}
        <FlatList style={styles.scrollViewStyle}
            data={products}
            renderItem={ ({item}) => <HistoryCard item={item} />}
            keyExtractor = {item => item.id}
        />
      {/* </ScrollView> */}
      <View style={styles.totalStyle}>
          <Text style={{fontSize: 18}}> Total: </Text>
          <Text style={styles.totalPrice}> ????đ </Text>
      </View>
      <View>
         <TouchableOpacity>
              <Text style={styles.buttonBuy}> Trở lại </Text>
          </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
} 
const styles = StyleSheet.create({
  imageStyle:{maxWidth: 120, maxHeight:140, resizeMode: 'contain',borderWidth: 0.3, borderColor: '#000'},
  displayFlexRow: {flexDirection: "row"},
  containers: { borderRadius: 10, flexDirection: "row", flexWrap:'wrap' ,justifyContent: 'space-between', maxHeight:300, alignItems:'center', backgroundColor:'#fff', padding: 10, borderWidth: 1, borderColor: '#E5E5E5'},
  boxLeft: {maxWidth: 160},
  displayFlexRow2: {flexDirection: "row", alignItems: 'center', justifyContent:'center'},
  boxRight: {textAlign: 'center'},
  nameProduct:{marginBottom: 10, fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase', lineHeight:20, maxWidth: 200},
  priceStyle:{ color:'#F8A058',fontSize: 18 },
  sizeStyle:{ color:'#424242',fontSize: 14, marginBottom: 5, marginTop: 5},
  inputStyle:{  marginLeft: 12,  width: 30, height: 30, fontSize: 20,  paddingLeft: 5  },
  inputSubStyle:{ textAlign: 'center', borderColor: '#000', borderWidth: 1, width: 100, height: 30, borderRadius: 5, color:'#000', fontSize: 13, paddingRight: 5, marginBottom: 10, marginTop: 5  },
  buttonStyle:{ marginLeft: 10, marginBottom: 3, textAlign: 'center', borderColor: '#000', borderWidth: 1, width: 30, height: 30, borderRadius: 5, color:'#000', fontSize: 20, paddingRight: 5},
  scrollViewStyle: {height: '80%'},
  totalPrice:{fontWeight:'bold',fontSize: 16},
  totalStyle:{marginTop: 10,flexDirection: "row", flex: 1, alignItems: 'center', justifyContent:'space-between', paddingTop: 15, paddingBottom: 15, height: 40, width: '96%',},
  buttonBuy:{textAlign:'center', marginTop: 10,paddingTop: 15, paddingBottom: 15, fontWeight:'bold', backgroundColor:'#EE9854' , width: '96%', marginLeft: 4,}
});
export default History;
