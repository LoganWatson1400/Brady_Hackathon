import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const violations = [
    {
        regulation: "ANSI A13.1 (Pipe Marking)",
        description: "This violation involves improper or missing pipe labeling, which can lead to hazardous misunderstandings."
    },
    {
        regulation: "ANSI Z358.1-2014 (Emergency Equipment)",
        description: "Emergency equipment must meet ANSI Z358.1 standards for accessibility and effectiveness."
    },
    {
        regulation: "OSHA 1910.37(a)(3)",
        description: "Exit routes must be clearly marked and unobstructed to ensure safe evacuation."
    },
    {
        regulation: "OSHA 1910.157(c)(1)",
        description: "Fire extinguishers must be easily accessible and properly maintained."
    },
    {
        regulation: "OSHA 1910.303(e)(1)",
        description: "Electrical panels must be clearly labeled and not blocked by any objects."
    },
    {
        regulation: "OSHA 1910.303(g)(1)",
        description: "Electrical equipment must have proper spacing and clearance to prevent hazards."
    },
    {
        regulation: "Fall Protection – General Requirements (1926.501)",
        description: "Fall protection is required in all situations where employees are exposed to falls of six feet or more."
    },
    {
        regulation: "Hazard Communication (1910.1200)",
        description: "Employers must inform workers about hazardous chemicals in their workplaces and provide proper training."
    },
    {
        regulation: "Scaffolding (1926.451)",
        description: "Scaffolding must be properly erected, supported, and maintained to ensure worker safety."
    }
];

const ViolationScreen = () => {
    return (
        <ScrollView style={styles.container}>
            {violations.map((item, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.title}>{item.regulation}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",

    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: "#333",
    },
});

export default ViolationScreen;
