arp -a | awk '! /IP/ {print "http://"$1}' | while read line; do
    RESPONSE=$(curl -v --silent $line:81/operator/state 2>&1 | grep -A 1 ChargePointID | grep -E -o '[0-9]{5,5}' | awk '{print $1}')
    if [ $(echo $RESPONSE | awk '{print length}') -gt 0 ]; then
        echo $RESPONSE "is at URI" $line
    fi
done