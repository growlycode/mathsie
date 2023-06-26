'use client'

/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";
import { useState, useEffect } from "react";

Font.register({ family: "Inter", src: "/assets/font.otf" })


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        minHeight: 600,
        padding: 15,
        paddingTop: 20,
        fontSize: 35
    },
    num: {
      
        textAlign: 'center',
        width: 50
    },
    ans: {
        paddingLeft: 10,
        paddingRight: 10
    },
    row: {
        display: "flex",
        flexDirection: 'row'
    },
    col: {
        margin: 10,
        padding: 10,
        display: "flex",
        flexDirection: 'row'
    }
});

export interface MathPDFProps {
    numberToGenerate: number;
    from: number;
    to: number;
}

export const MathPDF = ({ numberToGenerate, from, to }: MathPDFProps) => {
    interface Operation {
        a: number;
        b: number;
        op: string;
        val: number;
    }

    const generate = (num: number): Operation[] => {
        const maximum = to;
        const gen = (max: number) => from + Math.round(Math.random() * max);
        const vars = Array.from(Array(num), () => {
            const isAddition = Math.random() > 0.5;
            const a = gen(maximum);
            const b = gen(isAddition ? maximum-a : a);
            const operator = isAddition ? '+' : '-';
            return { a, b, op: operator, val: isAddition ? a + b : a - b };
        });
        return vars;
    }

    const pages: Operation[][] = generate(numberToGenerate).reduce((arr: Operation[][], num: Operation, idx: number) => {
        var thisArr: Operation[];
        if (idx % 10 === 0) {
            thisArr = [num];
            arr.push(thisArr);
        }
        else {
            thisArr = arr[arr.length-1];
            thisArr.push(num);
        }
        return arr;
    }, [] as Operation[][]);

    return (
        <Document>
            {pages.map((p: Operation[], pi: number) => (
            <Page  key={`p-${pi}`} size="A4" style={styles.page}>
                {p.map((exp: Operation, i: number) => {
                    return <View key={`t-${i}`} style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.num}>{exp.a}</Text>
                            <Text style={styles.num}>{exp.op}</Text>
                            <Text style={styles.num}>{exp.b}</Text>
                            <Text style={styles.num}>=</Text>
                            <Text style={styles.num}>___</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.ans}>Answer:</Text>
                            <Text style={styles.num}>{exp.val}</Text>
                        </View>
                    </View>
                })}
            </Page>))}
        </Document>
    )
}
const PDFView = ({ children }: any) => {

    const [client, setClient] = useState(false)

    useEffect(() => {
        setClient(true)
    }, [])

    return (
        <PDFViewer showToolbar={true}>
            {children}
        </PDFViewer>
    )
}
export default PDFView