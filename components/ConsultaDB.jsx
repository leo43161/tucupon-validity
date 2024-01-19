import React, { useEffect, useState } from 'react';
import { Text, View, Modal, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ConsultaDB = ({ inputValue, closeModal, visible }) => {
    const [data, setData] = useState(null);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState("");

    const fetchData = async () => {
        setLoad(true);
        setError(false);
        try {
            const response = await axios.get(`https://visitatucuman.ar/api/cupones?codigo=${inputValue}`);
            const responseJson = response.data;
            if (responseJson.status === 200) {
                setData(responseJson.result);
            } else {
                setError(true);
                setMsgError("El cupon no fue encontrado");
            }
            setLoad(false);
        } catch (error) {
            setError(true);
            setMsgError("Hubo un error al intentar consultar el cupon, inténtelo más tarde");
            console.error('Error al consultar la base de datos', error);
            setLoad(false);
        }
    };

    function convertDate(fecha) {
        // Crear un objeto Date a partir de la cadena de fecha
        const fechaObjeto = new Date(fecha);
      
        // Obtener día, mes y año
        const dia = fechaObjeto.getDate();
        const mes = fechaObjeto.getMonth() + 1; // Los meses en JavaScript son 0-indexados
        const anio = fechaObjeto.getFullYear();
      
        // Formatear la fecha como "dd/mm/yyyy"
        const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
      
        return fechaFormateada;
      }

    /* const burnHandler = async () => {
        try {
            const response = await axios.post(
                'http://10.15.15.151/touchvanilla/api/cupones',
                {
                    codigo: '1149020'
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error('Error al consultar la base de datos', error);
        }
    } */

    useEffect(() => {
        if (visible && inputValue.trim() !== "") {
            fetchData();
        }
    }, [visible])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {load ? (
                        <ActivityIndicator style={styles.loading} />
                    ) : error ? (
                        <Text style={styles.textError}>{msgError}</Text>
                    ) : data ? (
                        <>
                            <View style={styles.headContent}>
                                <View style={styles.imgCuponContain}>
                                    <Image
                                        style={styles.imgCupon}
                                        source={{
                                            uri: 'https://www.tucumanturismo.gob.ar/carga/cupon/' + data.imagen,
                                        }}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={styles.infoHeadContain}>
                                    <Text style={styles.textTitle}>{data.nombre}</Text>
                                    <Text style={styles.textDescuento}>{data.promocion}</Text>
                                    <Text style={styles.textDesc}>{data.descripcion}</Text>
                                </View>
                            </View>

                            <View style={styles.hr}></View>

                            <View style={styles.cuponContain}>
                                <Text style={styles.textCupon}>{data.id}-{data.clave}</Text>
                            </View>
                            <View style={styles.vencContain}>
                                <Text style={styles.textVencTitle}>Vencimiento:</Text>
                                <Text style={styles.textVenc}>{convertDate(data.fechaVenc)}</Text>
                            </View>

                            <View style={styles.hr}></View>

                            <View style={styles.personaContain}>
                                <View style={styles.infoPersonalContain}>
                                    <Text style={styles.textPersonal}>Nombre:</Text>
                                    <Text style={styles.textPersonal}>{data.nombrePersona} {data.apellidoPersona}</Text>
                                </View>
                                <View style={styles.infoPersonalContain}>
                                    <Text style={styles.textPersonal}>DNI:</Text>
                                    <Text style={styles.textPersonal}>{data.dniPersona}</Text>
                                </View>
                                <View style={styles.infoPersonalContain}>
                                    <Text style={styles.textPersonal}>Telefono:</Text>
                                    <Text style={styles.textPersonal}>{data.telefonoPersona}</Text>
                                </View>
                            </View>
                        </>
                    ) : null
                    }
                    <View style={styles.containButtons}>
                        <TouchableOpacity style={[styles.closeButton, styles.shadow]} title="Cerrar" onPress={closeModal}>
                            <Text style={styles.appButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    headContent: {
        width: '100%',
        flexDirection: 'row',
    },
    cuponContain: {
        backgroundColor: "#8EA831",
        width: "100%",
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 5
    },
    vencContain: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    infoPersonalContain: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    personaContain: {
        width: "100%",
        marginBottom: 10
    },
    imgCuponContain: {
        flex: 3,
        height: 150,
    },
    infoHeadContain: {
        flex: 4,
        paddingLeft: 10
    },
    imgCupon: {
        width: "100%",
        height: "100%",
    },
    textVencTitle: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
    textVenc: {
        fontSize: 23,
        textAlign: "center"
    },
    textTitle: {
        fontSize: 23,
        fontWeight: 'bold',
    },
    textError: {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 10
    },
    textPersonal: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    textDescuento: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#4F6E00',
    },
    textDesc: {
        fontSize: 17,
    },
    textCupon: {
        fontSize: 35,
        color: "white"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    containButtons: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
    },
    closeButton: {
        paddingVertical: 12,
        backgroundColor: '#5B6B22',
        borderRadius: 8,
        width: "100%"
    },
    appButtonText: {
        textAlign: 'center',
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    hr: {
        borderWidth: 0.2,
        borderColor: 'gray',
        margin: 10,
        width: "100%",
    },
    loading: {
        marginBottom: 10,
        width: 50
    },
});

export default ConsultaDB;