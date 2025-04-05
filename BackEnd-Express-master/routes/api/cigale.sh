#!/usr/bin/bash
# $1 = rowData $2 = sedName  $3 = pathfile $4 jack number
cd /home/data/blackbase/scripts/Alex
/usr/bin/python3 /home/data/blackbase/scripts/Alex/create_cigale_cat.py --row_data="$1" --image_path=$2
sed -i '1d' /home/data/blackbase/cigale-v2022.0/pcigale.ini
sed -i "1s|^|data_file = /home/data/blackbase/scripts/Alex/$2.txt\n|" /home/data/blackbase/cigale-v2022.0/pcigale.ini
cd /home/data/blackbase/cigale-v2022.0
/home/jack/.pyenv/versions/3.9.5/bin/pcigale -c /home/data/blackbase/cigale-v2022.0/pcigale.ini run 
/home/jack/.pyenv/versions/3.9.5/bin/pcigale-plots sed --format png
#temporary path
# cp /home/data/blackbase/cigale-v2022.0/out/$2_best_model.png /home/data/blackbase/cigale-v2022.0/pcigale
cp /home/data/blackbase/cigale-v2022.0/out/$2_best_model.png $3


