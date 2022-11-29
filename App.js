import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableNativeFeedback } from 'react-native';
import { styles } from './themes/default/default';
import { Card, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment/moment';

let menuSelect = "Todos"
let tempList = []
const bottomMenuOpacity = 0.4
export default function App() {
  const [list, setList] = useState()

  async function fetchData(status) {
    if (tempList.length == 0) {
      await fetch('https://controle-territorio.onrender.com/', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json()).then((obj) => {
        tempList = obj.filter((e) => e.Status != "DESATIVADO");
      }
      );
    }
    switch (status) {
      case "ABERTO":
        menuSelect = "Abertos"
        break;
      case "OK":
        menuSelect = "Entregues"
        break;
      case "Historico":
        menuSelect = "Historico"
        status = undefined;
        break;
      default:
        menuSelect = "Todos"
    }
    let ret = tempList;
    if (menuSelect != "Historico") {
      let rodadasList = []
      tempList.forEach((e) => {
        const index = rodadasList.findIndex((x) => x?.Territorio == e.Territorio);
        if (index > -1) {
          rodadasList.splice(index, 1);
          rodadasList[index] = e;
        } else {
          rodadasList.push(e)
        }
      })

      ret = rodadasList;
    }
    if (status) ret = ret.filter(e => e.Status == status)
    setList(ret)
  }


  function formatDate(date) {
    return moment(date).format('DD/MM/YYYY')
  }

  useEffect(() => {

    fetchData();
  }, [])
  return (
    <>
      <StatusBar style="inverted" />
      <View style={{ ...styles.top }}>
        <Text style={styles.h2}>Territórios</Text>
      </View>
      <View style={{ ...styles.container }}>
        <View>
          {
            list?.length > 0 &&
            <FlatList data={list} keyExtractor={item => `${item.Territorio}_${item.Rodadas}`} renderItem={(e) => {
              //if (!e.item.Dirigente) return;

              const defaultCard = { margin: 15, backgroundColor: "#FFF" }
              const cardNoPaper = { ...defaultCard, borderColor: "red", borderWidth: 2 }


              const car = <Card style={(e.item.OBS.length > 0 ? cardNoPaper : defaultCard)}>
                <Card.Content>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                    <View>
                      <Text style={{ ...styles.h2, color: "#5b3e84" }}>{e.item.Territorio}
                      </Text>
                    </View>
                    {
                      menuSelect != "Historico" &&
                      <>
                        <IconMaterialCommunityIcons size={18} name="newspaper-variant-multiple-outline" backgroundColor="#5b3e84" > {e.item.Folhas}</IconMaterialCommunityIcons>
                        <IconMaterialCommunityIcons size={18} name="home-group" backgroundColor="#5b3e84" > {e.item.NumCasas}</IconMaterialCommunityIcons>
                      </>
                    }
                    <View>
                      {
                        e.item.Rodadas > 0 &&
                        <>
                          <Text style={styles.badge}> RODADA: {e.item.Rodadas} </Text>

                        </>
                      }

                      {
                        e.item.OBS.length > 0 &&
                        <Text style={{ ...styles.badge, marginVertical: 2, backgroundColor: "red", textAlign: 'center' }}> {e.item.OBS} </Text>
                      }
                    </View>
                  </View>
                  {e.item.DiaSemana && <Paragraph>
                    Dia da semana: {e.item.DiaSemana}
                  </Paragraph>}

                  {e.item.Dirigente && <Paragraph>
                    Dirigente: {e.item.Dirigente}
                  </Paragraph>}

                  {e.item.Grupo &&
                    <Paragraph>
                      Grupo: {e.item.Grupo}
                    </Paragraph>
                  }

                  <Paragraph>
                    1ª Saída: {e.item.Saida_1 ? formatDate(e.item.Saida_1) : "Não houve"}  2ª Saída: {e.item.Saida_2 ? formatDate(e.item.Saida_2) : "Não houve"}
                  </Paragraph>
                  {e.item.Devolucao && <Paragraph>
                    Devolução: {formatDate(e.item.Devolucao)}
                  </Paragraph>
                  }
                  {menuSelect != "Historico" && <Paragraph>Status: <Text style={{ fontWeight: "bold" }}>{e.item.Status}</Text></Paragraph>}

                </Card.Content>
                {
                  menuSelect != "Historico" &&
                  <>
                    <Card.Cover style={{
                      ...styles.shadow,
                      height: 240,
                      margin: 15,
                      borderRadius: 10,
                      backgroundColor: '#fff',
                    }} source={{ uri: 'https://controle-territorio.herokuapp.com/getTerritory/' + e.item.Territorio }} />

                    <Card.Actions style={{ display: "flex", alignSelf: 'center' }}>
                      {e.item.Saida_1 && <View>
                        <IconMaterialCommunityIcons.Button name="marker-cancel" backgroundColor="#e63746" >Cancelar </IconMaterialCommunityIcons.Button>
                      </View>}
                      {e.item.Status != "OK" &&
                        <View>
                          <Icon.Button name="calendar" backgroundColor="#5b3e84" >Alterar dia </Icon.Button>
                        </View>}
                      {e.item.Status != "OK" &&
                        <View>
                          <Icon.Button name="check" backgroundColor="#46ad40" >Trabalhado </Icon.Button>
                        </View>
                      }

                    </Card.Actions>
                  </>
                }



              </Card>

              return car;
            }

            } />

          }
        </View>
      </View>
      <View style={{ ...styles.fixToText }}>
        <TouchableNativeFeedback delayPressIn={0} background={TouchableNativeFeedback.Ripple('#000000', true, 50)} onPress={() => fetchData("ABERTO")}>
          <View style={{ ...styles.button, opacity: (menuSelect != "Abertos" ? bottomMenuOpacity : 1) }}>
            <IconMaterialCommunityIcons style={{ textAlign: "center" }} size={20} color={(menuSelect != "Abertos" ? "#FFF" : "#A693C1")} name="human-male-male"></IconMaterialCommunityIcons>
            <Text style={{ ...styles.buttonText }}>Abertos</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback delayPressIn={0} background={TouchableNativeFeedback.Ripple('#000000', true, 50)} onPress={() => fetchData()}>
          <View style={{ ...styles.button, opacity: (menuSelect != "Todos" ? bottomMenuOpacity : 1) }}>
            <IconMaterialCommunityIcons size={20} style={{ textAlign: "center" }}
              color={(menuSelect != "Todos" ? "#FFF" : "#A693C1")} name="tray-full"></IconMaterialCommunityIcons>
            <Text style={{ ...styles.buttonText }}>Todos</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback delayPressIn={0} background={TouchableNativeFeedback.Ripple('#000000', true, 50)} onPress={() => fetchData("OK")}>
          <View style={{ ...styles.button, opacity: (menuSelect != "Entregues" ? bottomMenuOpacity : 1) }}>
            <Icon style={{ textAlign: "center" }} size={20} color={(menuSelect != "Entregues" ? "#FFF" : "#A693C1")} name="calendar-check-o"></Icon>
            <Text style={{ ...styles.buttonText }}>Entregues</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback delayPressIn={0} background={TouchableNativeFeedback.Ripple('#000000', true, 50)} onPress={() => fetchData("Historico")}>
          <View style={{ ...styles.button, opacity: (menuSelect != "Historico" ? bottomMenuOpacity : 1) }}>
            <Icon style={{ textAlign: "center" }} size={20} color={(menuSelect != "Historico" ? "#FFF" : "#A693C1")} name="history"></Icon>
            <Text style={{ ...styles.buttonText }}>Histórico</Text>
          </View>
        </TouchableNativeFeedback>
      </View >
    </>
  );

}








