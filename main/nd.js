function getNDunlocked(id){
    return [null,
        function(){return true},//1
        function(){return hasIU(10)},//2
        function(){return hasIU(11)},//3
        function(){return hasIU(23)},//4
        function(){return hasIU(32)},//5
        function(){return hasIU(43)},//6
        function(){return hasIU(43) && getIULevel(43).gte(2)},//7
        function(){return hasIU(43) && getIULevel(43).gte(3)},//8
    ][id]()
}
function getNDmult(){
    var mult = [null,one,one,one,one,one,one,one,one]
    mult[1] = mult[1].div(getIUEffect(12,1))
    mult[1] = mult[1].mul(getIUEffect(13))
    if(hasIU(30)) mult[2] = mult[2].mul(getIUEffect(30,1))
    if(hasIU(34)) mult[2] = mult[2].div(getIUEffect(34,1))
    for(dim=1;dim<=8;dim++){
        mult[dim] = mult[dim].mul(two.pow(player.nd[dim].bought))
    }

    if(hasIU(40)){
        for(dim=8;dim>=1;dim--){
            if(getNDunlocked(dim)){
                mult[dim] = mult[dim].mul(getIUEffect(40))
                break
            }
        }
    }
    if(hasIU(44)){
        let totalMult = one
        for(dim=1;dim<=8;dim++){
            totalMult = totalMult.mul(mult[dim])
        }
        let avgMult = totalMult.root(8)
        for(dim=1;dim<=8;dim++){
            if(mult[dim].gt(avgMult)) mult[dim] = mult[dim].div(getIUEffect(44,1))
        }
    }
    return mult//好耶
}
function getNDproc(id){
    return tmpNDmult[id].mul(player.nd[id].num)
}

var tmpNDmult = [null,zero,zero,zero,zero,zero,zero,zero,zero]

var ndCostIndex = [
    null,
    [n(10),n(100)],//cost , costMult 1
    [n(100),n(1000)],//cost , costMult 2
    [n(1e4),n(10000)],//cost , costMult 3
    [n(1e6),n(1e5)],//cost , costMult 4
    [n(1e9),n(1e6)],//cost , costMult 5
    [n(1e13),n(1e8)],//cost , costMult 6
    [n(1e18),n(1e10)],//cost , costMult 7
    [n(1e24),n(1e12)],//cost , costMult 8
]
function getDimCost(id){
    var costInc = ndCostIndex[id][1]
    if(id==1&&hasIU(33)) costInc = costInc.mul(5)
    var cost = ndCostIndex[id][0].mul(costInc.pow(player.nd[id].bought))
    if(hasIU(14)) cost = cost.mul(getIUEffect(14))
    if(hasIU(41)) cost = cost.mul(getIUEffect(41,1))
    if(hasIU(20)) cost = cost.div(getENEffect())
    return cost
}

function canBuyND(id){
    if(!getNDunlocked(id)) return false
    if(!hasIU(31)) if(player.nd[id].num.eq(1)) return false
    return true
}
function buyND(id){
    if(!canBuyND(id)) return
    player.am = player.am.add(getDimCost(id))
    player.nd[id].num = player.nd[id].num.add(1)
    player.nd[id].bought = player.nd[id].bought.add(1)
}
function getTotalBoughtND(){
    let total = zero
    for(dim=1;dim<=8;dim++) total = total.add(player.nd[dim].bought)
    return total
}

function checkNDAuto(){
    if(ndAutoCDTicker.lt(getNDAutoCD())) return
    ndAutoCDTicker = ndAutoCDTicker.sub(getNDAutoCD())
    var autoNDSetting = n(e("ndAutoInput").value).min(Number.MAX_VALUE)
    //console.log(autoNDSetting)
    if(autoNDSetting.lte(0)) return

    //IU21 - Automate Big Crunch
    if(getInfGain().gte(1)) inf()
    for(dim=8;dim>=1;dim--){
        while(canBuyND(dim) && getDimCost(dim).lte(autoNDSetting)) buyND(dim)
    }

    //IU22
    var timeWarp = getIUEffect(22,2)
    for(dim=7;dim>=1;dim--){
        player.nd[dim].num = player.nd[dim].num.add(getNDproc(dim+1).mul(timeWarp))
    }
    player.am = player.am.sub(getNDproc(1).mul(timeWarp)).max(1)
    
    //Recheck after Time Warp
    for(dim=8;dim>=1;dim--){
        while(canBuyND(dim) && getDimCost(dim).lte(autoNDSetting)) buyND(dim)
    }
    player.autoNDSetting = autoNDSetting
}
function getNDAutoCD(){
    var cd = n(5)
    cd = cd.sub(getIUEffect(22,1))
    return cd
}