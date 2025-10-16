# Java 你的第一門程式語言

## 環境

[Java Developer Kit](https://www.oracle.com/java/technologies/downloads/#java25)\
[Visual Studio Code](https://code.visualstudio.com/)

> **Hint**: 以下程式碼皆撰寫於 Skills.java 內

## 一個 Java 程式

在 Java 裡，每個程式都要放在一個 class 裡，而要讓程式能執行，必須告訴電腦**我的程式從哪裡開始執行**，這個起點就是 main method~ (method 在其他程式語言中通常稱作 function)

```java
class Skills {
    public static void main(String[] args) { // main method
        // 程式從這開始執行...
    }
}
```

## HelloWorld

這個程式往往是初學者或某個專案的開場白，其用意是讓程式設計者透過輸出"HelloWorld"到 console 來檢查環境是否可正常執行程式碼

```java
public class Skills {
  public static void main(String[] args) {
    System.out.print("Hello World");
  }
}
```

## 資料輸出

雖然都是用來輸出文字到螢幕上的語法，但它們有一些小差異

```java
System.out.print("Meow~~"); // 不換行
System.out.println("Meow~~"); // 會在輸出後自動換行
System.out.printf("Meow~~"); // 可用格式化輸出（類似 C# 語言的 printf）
```

## 變數 / 資料型態

## 資料輸入

## 運算式

## While 跑跑跑

## For 迴圈

## 陣列
