arp -a | awk '! /IP/ {print "http://"$1}' | while read line; do
    RESPONSE=$(curl -v --silent $line 2>&1 | grep -A 1 title | grep -E -o '[0-9]{8,8}' | awk '{print $1}')
    if [ $(echo $RESPONSE | awk '{print length}') -gt 0 ]; then
        echo "Master with serial number" $RESPONSE "is at URI" $line
    fi
done
