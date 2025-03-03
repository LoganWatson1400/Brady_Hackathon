import { StyleSheet, Text, View } from "react-native";
import { getReports } from "./reports";
import Report from "./Report";
import { useState } from "react";

export default function ReportMGR(props: { profile: string }) {
    const [reports, setReports] = useState([{
        report_name: undefined,
        your_name: undefined,
    }]);


    getReports(reports, props.profile, setReports);

    return (
        <View style={styles.body}>
            <Text style={[styles.header, {borderRadius: reports.length == 0 ? 10 : 0}]}>Manage Reports</Text>
            {reports.map((report, index) => (
                <Report
                    key={index}
                    your_name={report.your_name}
                    report_name={report.report_name}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
        body: {
            width: 375,
            alignSelf: "center",
            marginVertical: 5,
            borderRadius: 10,
            flex: 0,
            borderWidth: 1,
            borderColor: "gray",
        },

        header: {
            padding: 10,
            fontSize: 15,
            backgroundColor: "#1c4690",
            width: 373,
            height: 40,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            color: "white",
            fontWeight: "bold",
        },
    });