#!/bin/bash

rm ../action-view/public/assets/*

cp ./dist/* ../action-view/public/assets/

rm ../action-view/public/scripts/app*

mv ../action-view/public/assets/common.js ../action-view/public/scripts/common.js
mv ../action-view/public/assets/app*.js ../action-view/public/scripts/app.js

rm ../action-view/public/assets/*.map
#mv ../public/assets/app*.js.map ../public/scripts/app.js.map

rm ../action-view/docker/web/action-view/public/assets/*

cp ./dist/* ../action-view/docker/web/action-view/public/assets/

rm ../action-view/docker/web/action-view/public/scripts/app*

mv ../action-view/public/assets/common.js ../action-view/docker/web/action-view/public/scripts/common.js
mv ../action-view/public/assets/app*.js ../action-view/docker/web/action-view/public/scripts/app.js

rm ../action-view/docker/web/action-view/public/assets/*.map

echo 'deploy complete!'
