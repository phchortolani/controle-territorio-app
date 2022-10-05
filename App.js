import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { styles } from './themes/default/default';
import { Card, Title, Paragraph, shadow } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment/moment';

let menuSelect = "Todos"

export default function App() {
  const [list, setList] = useState()


  async function fetchData(status) {
    fetch('https://controle-territorio.herokuapp.com/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json()).then((obj) => {
      let ret = obj.filter((e) => e.Status != "DESATIVADO");

      if (status) {
        ret = obj.filter(e => e.Status == status)
      }

      switch (status) {
        case "ABERTO":
          menuSelect = "Abertos"
          break;
        case "OK":
          menuSelect = "Entregues"
          break;
        default:
          menuSelect = "Todos"
      }

      setList(ret)

    }
    );
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
              if (!e.item.Dirigente) return;

              const car = <Card style={{ margin: 15, backgroundColor: "#FFF" }}>
                <Card.Content>
                  <Title>
                    <Text style={{ ...styles.h2, color: "#5b3e84" }}>Território: {e.item.Territorio}</Text>
                    {e.item.Rodadas > 0 && <Text style={{ fontSize: 10 }}> Rodada: {e.item.Rodadas} </Text>}
                  </Title>
                  <Paragraph>
                    Dia da semana: {e.item.DiaSemana}
                  </Paragraph>
                  <Paragraph>
                    Dirigente: {e.item.Dirigente}
                  </Paragraph>
                  <Paragraph>
                    Grupo: {e.item.Grupo}
                  </Paragraph>
                  <Paragraph>
                    1ª Saída: {formatDate(e.item.Saida_1)}  2ª Saída: {e.item.Saida_2 ? formatDate(e.item.Saida_2) : "Não houve"}
                  </Paragraph>
                  <Paragraph>
                    Devolução: {formatDate(e.item.Devolucao)}
                  </Paragraph>
                  <Paragraph>Status:  <Text style={{ fontWeight: "bold" }}>{e.item.Status}</Text></Paragraph>
                </Card.Content>
                <Card.Cover style={{
                  ...styles.shadow,
                  height: 240,
                  margin: 15,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                }} source={{ uri: 'https://controle-territorio.herokuapp.com/getTerritory/' + e.item.Territorio }} />

                <Card.Actions style={{ display: "flex", alignSelf: 'center' }}>
                  <View>
                    <IconMaterialCommunityIcons.Button name="marker-cancel" backgroundColor="#e63746" >Cancelar </IconMaterialCommunityIcons.Button>
                  </View>
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

              </Card>

              return car;
            }

            } />

          }
        </View>
      </View>
      <View style={{ ...styles.fixToText }}>
        <TouchableOpacity onPress={() => fetchData("ABERTO")}>
          <View style={{ ...styles.button, opacity: (menuSelect == "Abertos" ? 0.5 : 1) }}>
            <IconMaterialCommunityIcons style={{ textAlign: "center" }} size={20} color="#A693C1" name="human-male-male"></IconMaterialCommunityIcons>
            <Text style={{ ...styles.buttonText }}>Abertos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => fetchData()}>
          <View style={{ ...styles.button, opacity: (menuSelect == "Todos" ? 0.5 : 1) }}>
            <IconMaterialCommunityIcons size={20} style={{ textAlign: "center" }} color="#A693C1" name="tray-full"></IconMaterialCommunityIcons>
            <Text style={{ ...styles.buttonText }}>Todos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => fetchData("OK")}>
          <View style={{ ...styles.button, opacity: (menuSelect == "Entregues" ? 0.5 : 1) }}>
            <Icon style={{ textAlign: "center" }} size={20} color="#A693C1" name="calendar-check-o"></Icon>
            <Text style={{ ...styles.buttonText }}>Entregues</Text>
          </View>
        </TouchableOpacity>


      </View >
    </>
  );

}








