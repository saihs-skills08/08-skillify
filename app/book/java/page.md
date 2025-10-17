# Java 你的第一門程式語言

## 環境

[Java Developer Kit](https://www.oracle.com/java/technologies/downloads/#java25)
[Visual Studio Code](https://code.visualstudio.com/)

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

變數用於儲存資料，創建每個變數時你需要告訴Java這個變數是什麼樣的型態，他是數字、文字、小數...

> **查查看：** Java 有哪些資料型態呢？
> [參考文章](https://www.w3schools.com/java/java_data_types.asp)

一些小範例：

```java
int number = 10;

float myFloatNum = 5.99f;

double myDoubleNum = 5.8999;

String name = "Kitten";

boolean turnOn = false;
```

## 輸出變數

如果你想要把變數給顯示出來的話，主要有三種方法:
最簡單就是直接把變數放進去print中顯示

```java
int number = 10;
System.out.println(number); // 把 number 這個變數顯示出來
```

如果你想要除了變數外加上文字可以用加號把他們連在一起

> 加號在字串中代表「連接」，而不是數學加法喔

```java
int age = 3;
System.out.println("我今年 " + age + " 歲");
```

但如果你想要更靈活地控制輸出格式，你可以用在字串中插入標記（如下面的%d、%s），並在後面依序告訴它這些代號代表什麼變數

> **查查看：** 有哪些標記可以使用呢，它們分別適用於哪種資料型態？

```java
int age = 10;
String name = "Kitten";

System.out.printf("Hello 我是%s, 我今年%d",name, age)
```

## 資料輸入

有輸出就一定有輸入，在Java中我們可以用一個內建的工具叫`Scanner`來讀取使用者輸入的資料
[Scanner 參考文檔](https://www.w3schools.com/java/java_user_input.asp)
因為`Scanner`這個工具並非在編譯時就自動載入，所以我們會需要用`import`這個語法來將這個工具導入進我們的程式中
，在Java中有一些預設的套件，每個套件中有不同的工具可以給我們使用，例如`Scanner`這個工具是來自`java`的`util`套件中，因此當我們要使用它時，我們可以：

```java
import java.util.Scanner;
```

> 在大部分的程式語言中，`.`通常代表`的`的意思

導入工具後我們首先要為這個工具建立一個物件，接著就可以用它來讀取使用者數出的內容囉～

```java
Scanner input = new Scanner(System.in);
String name = input.nextLine();

System.out.println("Yeee哈囉" + name + "很高興認識你～");
```

## 運算式

就像數學中的加減乘除，在Java中我們使用「＋」、「-」、「\*」、「/」去做計算，運算式可以是算式運算(＋ or - )、比較運算(> or ==)

```java
int a = 10;
int b = 20;

System.out.printf("a = %d,b = %d",a,b); // 計算前
b = b - a; // 也可以直接寫 b -= a
System.out.printf("a = %d,b = %d",a,b); // 計算後
```

## While 跑跑跑

## For 迴圈

## 陣列
