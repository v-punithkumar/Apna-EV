
1. Install Ionic CLI
   `npm install -g @ionic/cli`

2. Install npm modules: `npm install` (depending on Angular version may require `npm install --legacy-peer-deps` or `npm install --force`)

3. To run in desktop browser: `ionic serve`

## Web production build:

Run `ionic build --prod` which will output html build to www folder. When updating live app, preserve web.config and favicon.
Copy `www` output to gh-pages branch and commit to publish. When updating live app, preserve CNAME and favicon.



Python Side Implementation 

1. python3 -m venv myenv
2. source .\myenv\Scripts\activate
3. pip install flask
4. pip install flask_pymongo
5. pip install flask_cors

After this run 

python .\live.py

