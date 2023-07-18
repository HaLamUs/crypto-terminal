# Simple portfolio checker

This application is part of the Propine test

FYI: https://gist.github.com/liangzan/4436cb8b083c66b3517e7f4d80939f06

### Prerequisite

- [Nodejs 16.9.1 and above](https://nodejs.org/en/download)

## Getting Started

Clone this project with the following commands:

```bash
git clone git@github.com:HaLamUs/crypto-terminal.git
```

### Configure the application
1. Data 

Create new folder named data, then put the transactions.csv in it

2. Install packages
```
npm i
```

### Usage

#### Need help
```bash
node . --help
```

#### Get latest portfolio
```bash
node .

```

#### Return the latest portfolio value for that token in USD

```bash
node . -t eth

```

#### Return the portfolio value per token in USD on that date

```bash
node . -d 2023/03/22

```

#### Return the portfolio token value in USD by given date

```bash
node . -d 2023/03/22 -t btc

```

### Detail 
1. Caching 

When starting for the first time the program needs at least 3 minutes. (Mac mini M1)

My stategy is using cache here, after 30 mins the cache will be invalid

2. Promise all 

I can not find the history api whose param is a token array so I loop the token array to invoke api one by one.

### Video

https://user-images.githubusercontent.com/9162651/228614152-c0f79728-ebc7-4ed0-a036-47c24a4bbf8c.mov


<p><img type="separator" height=8px width="100%" src="https://github.com/HaLamUs/nft-drop/blob/main/assets/aqua.png"></p>

## Author

This repo was developed by [@lamha](https://github.com/HaLamUs).

Follow or connect with me on [LinkedIn](https://www.linkedin.com/in/lamhacs). 


## License

MIT License
