# README


* Prerequisites 
    - Rails > 5.1
    - Ruby > 2.3.1
    - Node.js > 6.0.0
    - Yarn > 0.25.2

* Configuration

	- rename `config/application.example.yml` to `config/application.yml`

* Deployment instructions
	- Local server
		- Filled with your api_token key on `config/application.yml`
		- Run project
		- ```$ bundle install```
		- ```$ rails server```
		- new tab, same location
		- ```$ bin/webpack-dev-server```
		- Browser : ```http://localhost:3000```
		
 	- Heroku
			 
	     - Push secret information by Figaro
	     -  ```$ figaro heroku:set -e production```

