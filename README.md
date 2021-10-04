# Blue Beard
![](https://t4.ftcdn.net/jpg/02/92/52/69/360_F_292526993_EU4yqXtH6ut53hNsNmiwjY5YPSxXGqgL.jpg)
## How to Install
```
1. Clone the repo
2. cd into blue_beard folder
2. npm install
3. node app.js
```
### Framework decision
```$xslt
I choose to use node.js because it's a lightweight
single thread server framework, and this is a pretty small 
lightweight service. Also, I wanted to learn node.js and 
thought this would be a good opportunity to do that :)
```
### Additional thoughts
```
I spent about 3.5 hours on this service.

Given more time I would have explored more flexible 
customization such as letting the user specify
the body type, returning an html form on / GET so the
service would have a UI, or exploring the additional options
of MailGun and SendGrid. 

I also would have liked to taken advantage of using interfaces, 
so it would be simple and clean to add additional email services
instead of the services basically being hard coded into the handler.

A log record would have been nice to have, and better server 
returns would be nice. Also, the returns between files aren't
protected or double checked. Some sort of return struct would
have been safer, but right now there is a big assumption between
the files that the correct object is being returned.
```

### Example
Basic Call:

![](https://user-images.githubusercontent.com/54955992/135929207-ccf81dda-a9d4-4cd5-a57b-757a9e483b5f.png)
Changing Primary Email Service:

![](https://user-images.githubusercontent.com/54955992/135929278-0e9ea245-1e44-4bfc-a6ce-95fc679d8cbe.png)

