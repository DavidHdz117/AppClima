// App.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import WeatherCard from "../components/WeatherCard";

const API_KEY = "42652a5533df477d9c7131725241110"; // Reemplaza con tu clave de API
const CITY = "Mexico";

const Clima = () => {
    interface ForecastDay {
        date: string;
        weekday: string;
        day: {
        maxtemp_c: number;
        mintemp_c: number;
        daily_chance_of_rain: number;
        condition: {
            text: string;
        };
        };
}

const [forecast, setForecast] = useState<ForecastDay[]>([]);
const [loading, setLoading] = useState(true);

const getWeekday = (dateString: string) => {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const date = new Date(dateString);
    return days[date.getDay()];
};

useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=5&aqi=no&alerts=no&lang=es`)
    .then(response => response.json())
    .then(data => {
        if (data.forecast && data.forecast.forecastday) {
            const formattedData: ForecastDay[] = data.forecast.forecastday.map((day: any) => ({
            date: day.date,
            weekday: getWeekday(day.date),
            day: day.day
        }));
        setForecast(formattedData);
        } else {
            console.error("Datos de pronóstico no disponibles");
        }
        setLoading(false);
    })
    .catch(error => {
        console.error("Error al obtener datos:", error);
        setLoading(false);
    });
}, []);

return (
    <View style={styles.container}>
    <Text style={styles.title}>Pronóstico del Clima</Text>
    {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
    ) : (
        <FlatList
            data={forecast}
            keyExtractor={item => item.date}
            renderItem={({ item }) => <WeatherCard weather={item} />}
        />
    )}
    </View>
);
};

export default Clima;

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},
title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
},
card: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
},
date: {
    fontSize: 18,
    fontWeight: "bold",
},
temp: {
    fontSize: 16,
},
rain: {
    fontSize: 14,
    color: "#555",
},
condition: {
    fontSize: 16,
    fontWeight: "bold",
},
});
