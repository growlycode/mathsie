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

export interface Operand {
    num: number;
    isRequired: boolean;
}

export interface MathPDFProps {
    numberToGenerate: number;
    operationIds: string[];
    operationsSequential: boolean;
    specifyLeftOperands: boolean;
    leftOperands: number[];
    specifyRightOperands: boolean;
    rightOperands: number[];
}

export const allOperations: Operation[] = [
    { id: 'add', title: 'Addition', symbol: '+', func: (a: number, b: number) => a + b },
    { id: 'subtract', title: 'Subtraction', symbol: '-', func: (a: number, b: number) => a - b },
    { id: 'mult', title: 'Multiplication', symbol: '*', func: (a: number, b: number) => a * b },
    { id: 'div', title: 'Division', symbol: '/', func: (a: number, b: number) => a / b }
  ];

const opMap = allOperations.reduce((acc, op) => acc.set(op.id, op), new Map<string, Operation>());
  

export interface Operation {
    id: string;
    title: string;
    symbol: string;
    func: (a: number, b: number) => number;
}

interface Equation {
    a: number;
    b: number;
    op: string;
    val: number;
}
export const MathPDF = ({ numberToGenerate, operationIds, operationsSequential, leftOperands, rightOperands }: MathPDFProps) => {


    const generate = (numToGenerate: number): Equation[] => {
        const operationCounts = new Map<string, number>();
        const perOperation = Math.floor(numToGenerate / operationIds.length);
        operationIds.map(o => operationCounts.set(o, perOperation));

        const rand = (arr: number[]) => {
            const idx = Math.floor(Math.random() * arr.length);
            const num: number = arr[idx];
            return num;
        } ;
        const pickLeft = () => rand(leftOperands);
        const pickRight = () => rand(rightOperands);

        const genEqn = (op: Operation) => {

            const left = pickLeft();
            const right = pickRight();
            return { a: left, b: right, op: op.symbol, val: op.func(left, right) };

        }

        if (operationsSequential) {
            const eqns = operationIds.flatMap(opId => Array.from(Array(operationCounts.get(opId)), () => genEqn(opMap.get(opId)!)));
            return eqns;
        }
        return [];
    }

    const pages: Equation[][] = generate(numberToGenerate).reduce((arr: Equation[][], num: Equation, idx: number) => {
        var thisArr: Equation[];
        if (idx % 10 === 0) {
            thisArr = [num];
            arr.push(thisArr);
        }
        else {
            thisArr = arr[arr.length - 1];
            thisArr.push(num);
        }
        return arr;
    }, [] as Equation[][]);

    return (
        <Document>
            {pages.map((p: Equation[], pi: number) => (
                <Page key={`p-${pi}`} size="A4" style={styles.page}>
                    {p.map((exp: Equation, i: number) => {
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

    return (
        <PDFViewer showToolbar={true}>
            {children}
        </PDFViewer>
    )
}
export default PDFView