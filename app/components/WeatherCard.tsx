// components/WeatherCard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface WeatherCardProps {
    weather: {
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
    };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
    const { date, weekday, day } = weather;
    const { maxtemp_c, mintemp_c, daily_chance_of_rain, condition } = day;

    const getBackgroundColor = () => {
        if (maxtemp_c < 20) return "#2196F3";
        if (maxtemp_c <= 30) return "#FFEB3B";
        return "#FF9800";
    };

    return (
        <View style={[styles.card, { backgroundColor: getBackgroundColor() }]}> 
            <Text style={styles.weekday}>{weekday}</Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.temp}>Máx: {maxtemp_c}°C / Mín: {mintemp_c}°C</Text>
            <Text style={styles.rain}>Lluvia: {daily_chance_of_rain}%</Text>
            <Text style={styles.condition}>{condition.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
card: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "100     %",
    alignSelf: "center",
    },
    weekday: {
    fontSize: 20,
    fontWeight: "bold",
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

export default WeatherCard;
