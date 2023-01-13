var iu = {
    10:{
        cost(x = getIULevel(this.id)){return n(1)},
        description(){return `t1 - 解锁第二维度,但你起始时拥有1000反物质.解锁新升级(取消该升级后暂时无效).无限点获取翻倍.`},
        cap(){return n(1)},
        type:"main",
    },
    11:{
        cost(x = getIULevel(this.id)){return n(2)},
        description(){return `t1.1 - 解锁第三维度.`},
        cap(){return n(1)},
        type:"upgrade",
    },
    12:{
        cost(x = getIULevel(this.id)){return two.pow(x.add(1))},
        description(){return `t1.2 - 第一维度产量/(x+1)^(x+1) (当前: /${format(this.effect1())})<br>IP*1.5^x. (当前: *${format(this.effect2())}).`},
        effect1(x = getIULevel(this.id)){//一维减益
            return x.add(1).pow(x.add(1))
        },
        effect2(x = getIULevel(this.id)){//IP增益
            return n(1.5).pow(x)
        },
        cap(){return n(9)},
        type:"challenge",
    },
    13:{
        cost(x = getIULevel(this.id)){
            if(x.lt(5)) return n(3).pow(x.add(1))
            return n(4).pow(x.add(3))
        },
        description(){return `t1.3 - 无限点加成第一维度.<br>当前: *${format(this.effect())}`},
        effect(x = getIULevel(this.id)){
            return player.ip.add(1).pow(x.pow(x.div(100).add(1)).mul(1.25).add(1).log10())
        },
        cap(){return n(9)},
        type:"upgrade",
    },
    14:{
        cost(x = getIULevel(this.id)){return n(16)},
        description(){return `t1.4 - 所有维度的价格被一维倍率倍增.无限点获取*1.5.`},
        effect(x = getIULevel(this.id)){
            if(tmpNDmult[1].lte(0)) return n("1.8e308")
            return tmpNDmult[1]
        },
        cap(){return n(1)},
        type:"challenge",
    },
    20:{
        cost(x = getIULevel(this.id)){return n(64)},
        description(){return `t2 - 解锁维度自动化(间隔:5s).购买维度总数/5后直接倍增无限点获取.(当前: *${format(this.effect())}) 解锁能量.`},
        effect(x = getIULevel(this.id)){
            return getTotalBoughtND().div(5)
        },
        cap(){return n(1)},
        type:"main",
    },
    21:{
        cost(x = getIULevel(this.id)){return n(64)},
        description(){return `t2.1 - 如果在维度自动化触发前你的无限点获取量大于1,则自动进行一次无限重置.`},
        cap(){return n(1)},
        type:"upgrade",
    },
    22:{
        cost(x = getIULevel(this.id)){return n(64).mul(n(2).pow(x))},
        description(){return `t2.2 - 维度自动化间隔 -${formatWhole(this.effect1())}s. 每次维度自动化触发时, 物质维度获得 ${format(this.effect2())}s 的产量.(不生产能量)`},
        effect1(x = getIULevel(this.id)){
            return x
        },
        effect2(x = getIULevel(this.id)){
            return x.div(4).sqrt()
        },
        cap(){return n(4)},
        type:"upgrade",
    },
    23:{
        cost(x = getIULevel(this.id)){return n(128)},
        description(){return `t2.3 - 解锁第四维度.你起始时拥有1e5反物质.`},
        cap(){return n(1)},
        type:"challenge",
    },
    24:{
        cost(x = getIULevel(this.id)){return n(128).mul(n(2).pow(x))},
        description(){return `t2.4 - 反物质为1时, 物质维度购买数归零后时间倒流 ${formatWhole(this.effect1())}s(能量不变,最高维度数量倒流时暂时保留)<br>无限点获取*1.5^x. (当前: *${format(this.effect2())})`},
        effect1(x = getIULevel(this.id)){
            if(x.eq(0)) return n(0)
            return n(3).pow(x.sub(1)).mul(40)
        },
        effect2(x = getIULevel(this.id)){
            return n(1.5).pow(x)
        },
        cap(){return n(4)},
        type:"challenge",
    },
    30:{
        cost(x = getIULevel(this.id)){return n(1024)},
        description(){return `t3 - t1.3的效果的立方根加成第二维度(*${format(this.effect1())}).无限点倍增起始反物质.(*(x+1) = *${format(this.effect2())}).无限收益在40s内持续增加.(*(t/20) = *${format(this.effect3())}) 能量效果^0.8.`},
        effect1(x = getIULevel(this.id)){
            return getIUEffect(13).root(3)
        },
        effect2(x = getIULevel(this.id)){
            if(hasIU(60)) return player.ip.add(1).pow(2)
            return player.ip.add(1)
        },
        effect3(x = getIULevel(this.id)){
            return player.infTime.min(40).div(20)
        },
        cap(){return n(1)},
        type:"main",
    },
    31:{
        cost(x = getIULevel(this.id)){return n(512)},
        description(){return `t3.1 - 移除维度的"Capped at 1".`},
        cap(){return n(1)},
        type:"upgrade",
    },
    32:{
        cost(x = getIULevel(this.id)){return n(1024)},
        description(){return `t3.2 - 解锁第五维度,但无限点*0.8.`},
        cap(){return n(1)},
        type:"upgrade",
    },
    33:{
        cost(x = getIULevel(this.id)){return n(2048)},
        description(){return `t3.3 - 第一维度的价格增长速度*5.无限点*1.8.`},
        cap(){return n(1)},
        type:"challenge",
    },
    34:{
        cost(x = getIULevel(this.id)){return n(2048).mul(n(2).pow(x))},
        description(){return `t3.4 - 反物质越接近物质产量,二维的倍率越低(/${format(this.effect1())}).无限点*1.5^x.(*${format(this.effect2())})`},
        effect1(x = getIULevel(this.id)){
            return getNDproc(1).max(10).log10().mul(x.div(2).add(1.5)).div(player.am.add(9).log10()).pow(x.mul(1.75).add(1.5)).max(1)
        },
        effect2(x = getIULevel(this.id)){
            return n(1.5).pow(x)
        },
        cap(){return n(4)},
        type:"challenge",
    },
    40:{
        cost(x = getIULevel(this.id)){return n(4096)},
        description(){return `t4 - 一维数量削弱后加成最高维度.(*${format(this.effect())})无限点*0.75.`},
        effect(x = getIULevel(this.id)){
            return ten.pow(player.nd[1].num.max(1).log10().add(1).log10().pow(2))
        },
        cap(){return n(1)},
        type:"main",
    },
    41:{
        cost(x = getIULevel(this.id)){return n(4096).mul(n(4).pow(x))},
        description(){return `t4-1 - 维度价格*100^x^1.25. (*${format(this.effect1())})<br>无限点*(1.5^x+x/2) (*${format(this.effect2())}).`},
        effect1(x = getIULevel(this.id)){
            return n(100).pow(x.pow(1.25))
        },
        effect2(x = getIULevel(this.id)){
            return n(1.5).pow(x).add(x.div(2))
        },
        cap(){return n(6)},
        type:"challenge",
    },
    42:{
        cost(x = getIULevel(this.id)){return n(4096).mul(n(4).pow(x))},
        description(){return `t4-2 - 物质二维生产反物质. 无限点*1.5.`},
        cap(){return n(1)},
        type:"challenge",
    },
    43:{
        cost(x = getIULevel(this.id)){return n(8192).mul(n(2).pow(x))},
        description(){return `t4-3 - 每级解锁一个新维度(6~8维),<br>但初始反物质*(10^(x+1)^2/10) (*${format(this.effect())}).`},
        effect(x = getIULevel(this.id)){
            return n(10).pow(x.add(1).pow(2)).div(10)
        },
        cap(){return n(3)},
        type:"challenge",
    },
    44:{
        cost(x = getIULevel(this.id)){return n(16384).mul(n(4).pow(x))},
        description(){return `t4-4 - 以全部维度倍率(直到八维,未解锁为1)的几何平均数为基准,超出的倍率整体/2^x^1.25(/${format(this.effect1())}).<br>无限点*1.75^x.(*${format(this.effect2())})`},
        effect1(x = getIULevel(this.id)){
            return n(2).pow(x.pow(1.25))
        },
        effect2(x = getIULevel(this.id)){
            return n(1.75).pow(x)
        },
        cap(){return n(3)},
        type:"challenge",
    },
    50:{
        cost(x = getIULevel(this.id)){return n(262144)},
        description(){return `t5 - 解锁维度献祭,清除1~7维但基于8维数加成八维(5^x).解锁维度献祭自动化.八维只能用能量购买.八维价格重调.`},
        cap(){return n(1)},
        type:"main",
    },
    51:{
        cost(x = getIULevel(this.id)){return n(262144)},
        description(){return `t5.1 - 优化维度自动化设置,维度自动化间隔-0.5s.`},
        cap(){return n(1)},
        type:"upgrade",
    },
    52:{
        cost(x = getIULevel(this.id)){return n(5e5).mul(n(5).pow(x))},
        description(){return `t5.2 - 所有维度的购买倍率仅在每${format(this.effect1())}次购买后变化.例如效果为2时,买2次与买3次都计为2 次的倍率.<br>无限点*(x*0.4+1).(*${format(this.effect2())})`},
        effect1(x = getIULevel(this.id)){
            return x.add(1)
        },
        effect2(x = getIULevel(this.id)){
            return x.mul(0.4).add(1)
        },
        cap(){return n(3)},
        type:"challenge",
    },
    53:{
        cost(x = getIULevel(this.id)){return n(1e6).mul(n(5).pow(x))},
        description(){return `t5.3 - 所有维度基于维度序数与时间降低倍率.(维度每高一级倍率/${format(this.effect1())})<br>无限点*1.8^x(*${format(this.effect2())}).献祭底数增加x.提高t5.4上限,直至5级.`},
        effect1(x = getIULevel(this.id)){
            return n(1.25).pow(x.div(2).add(player.infTime.div(4).add(10).log10().sub(1)).pow(1.25)).sqrt()
        },
        effect2(x = getIULevel(this.id)){
            return n(1.8).pow(x)
        },
        cap(){return getIULevel(54).add(1).min(6)},
        type:"challenge",
    },
    54:{
        cost(x = getIULevel(this.id)){return n(1e6).mul(n(5).pow(x))},
        description(){return `t5.4 - 每级使得生产能量的维度提高一维.(当前:${formatWhole(this.effect1())}维)<br>无限点*2^x(*${format(this.effect2())}).提高t5.3上限,直到6级.献祭底数增加x.`},
        effect1(x = getIULevel(this.id)){
            return x.add(1)
        },
        effect2(x = getIULevel(this.id)){
            return n(2).pow(x)
        },
        cap(){return getIULevel(53).add(1).min(5)},
        type:"challenge",
    },
    60:{
        cost(x = getIULevel(this.id)){return n(2.5e6)},
        description(){return `t6 - t3中无限点对起始反物质的效果^2,无限点加成献祭底数(+ ${format(this.effect())}).`},
        effect(x = getIULevel(this.id)){
            return player.ip.div(1e5).add(1).log10()
        },
        cap(){return n(1)},
        type:"main",
    },
    61:{
        cost(x = getIULevel(this.id)){return n(2.5e6).mul(n(4).pow(x))},
        description(){return `t6.1 - 增加能量的效果.(^${format(this.effect(),3)})`},
        effect(x = getIULevel(this.id)){
            return x.div(25).add(1)
        },
        cap(){return n(5)},
        type:"upgrade",
    },
    62:{
        cost(x = getIULevel(this.id)){return n(4e6)},
        description(){return `t6.2 - 七维倍率为0,八维在非时间迁越中还会生产六维.无限点*1.75.`},
        cap(){return n(1)},
        type:"challenge",
    },
    63:{
        cost(x = getIULevel(this.id)){return n(6666666).mul(n(3).pow(x))},
        description(){return `t6.3 - 无限点加成能量获取.(*${format(this.effect())})`},
        effect(x = getIULevel(this.id)){
            return player.ip.div(1e4).add(1).pow(x.div(2).add(1).log10().mul(2))
        },
        cap(){return n(4)},
        type:"upgrade",
    },
    64:{
        cost(x = getIULevel(this.id)){return n(1e7).mul(n(4).pow(x))},
        description(){return `t6.4 - 每次进行维度献祭时反物质数量增加.(*${format(this.effect1())})<br>无限点*1.6^x.(*${format(this.effect2())})`},
        effect1(x = getIULevel(this.id)){
            return n(100).pow(x.pow(1.25))
        },
        effect2(x = getIULevel(this.id)){
            return n(1.6).pow(x)
        },
        cap(){return n(5)},
        type:"challenge",
    },
}
for(i in iu) iu[i].id = i

function iuEnabled(id){
    id = Number(id)
    if(id%10) return iuEnabled(id-id%10) && getIULevel(id-id%10).gt(0)
    if(id == 10) return true
    return getIULevel(id-10).gt(0) && iuEnabled(id-10)
}
function hasIU(id){
    return player.iu[id].gte(1) && iuEnabled(id)
}
function getIULevel(id){
    id = Number(id)
    //if(player.iu[id-id%10].lt(1)) return zero
    return player.iu[id]
}
function getIUEffect(id,extra = "",level){
    if(!level) level = player.iu[id]
    if(!iuEnabled(id)) return iu[id]["effect"+extra](zero)
    return iu[id]["effect"+extra](level)
}
function getIUCost(id,level){
    if(!level) level = player.iu[id]
    return iu[id].cost(level)
}

function canBuyIU(id){
    var level = getIULevel(id)
    var cost = getIUCost(id,level)
    if(iu[id].cap) if(level.gte(iu[id].cap())) return false
    if(player.ip.lt(cost)) return false
    return true
}

function buyIU(id){
    if(shift){downgradeIU(id);return}
    if(!canBuyIU(id)) return
    player.ip = player.ip.sub(getIUCost(id))
    player.iu[id] = player.iu[id].add(1)    
    inf()
}

function downgradeIU(id){
    if(player.iu[id].lt(1)) return
    player.iu[id] = player.iu[id].sub(1)
    player.ip = player.ip.add(getIUCost(id,player.iu[id]))
    inf()
}

function getENGain(){
    var gain = player.am.sub(1).min(getNDproc(1).mul(diff)).div(100).max(0)
    if(hasIU(54)) gain = player.am.sub(1).min(getNDproc(getIUEffect(54,1).toNumber()).mul(diff)).div(100).max(0)
    if(hasIU(63)) gain = gain.mul(getIUEffect(63))
    return gain
}
function getENEffect(){
    var eff = player.energy.add(1)
    if(hasIU(30)) eff = eff.pow(0.8)
    if(hasIU(61)) eff = eff.pow(getIUEffect(61))
    return eff
}

function inf(){
    //if(player.am.neq(1) && !force) return
    tmpNDmult = [null,zero,zero,zero,zero,zero,zero,zero,zero]
    player.ip = player.ip.add(getInfGain())
    player.infinitied = true
    player.infTime = n(0)
    player.energy = n(0)
    player.rewinded = false
    player.sacrifice = n(0)
    sacrificeAutoCDTicker = n(0)

    player.am = getStartAM()
    for(dim=1;dim<=8;dim++){
        player.nd[dim].num = zero
        player.nd[dim].bought = zero
    }
}

function getStartAM(){
    var am = ten
    if(hasIU(10)) am = n(1000)
    if(hasIU(23)) am = n(1e5)

    if(hasIU(30)) am = am.mul(getIUEffect(30,2))
    if(hasIU(43)) am = am.mul(getIUEffect(43))
    return am
}

function getInfGain(force){
    if(player.am.neq(1) && !force) return zero
    var gain = one

    if(hasIU(10)) gain = gain.mul(2)
    if(hasIU(12)) gain = gain.mul(getIUEffect(12,2))
    if(hasIU(14)) gain = gain.mul(1.5)

    if(hasIU(20)) gain = gain.mul(getIUEffect(20))
    if(hasIU(24)) gain = gain.mul(getIUEffect(24,2))

    if(hasIU(30)) gain = gain.mul(getIUEffect(30,3))
    if(hasIU(32)) gain = gain.mul(0.8)
    if(hasIU(33)) gain = gain.mul(1.8)
    if(hasIU(34)) gain = gain.mul(getIUEffect(34,2))

    if(hasIU(40)) gain = gain.mul(0.75)
    if(hasIU(41)) gain = gain.mul(getIUEffect(41,2))
    if(hasIU(42)) gain = gain.mul(1.5)
    if(hasIU(44)) gain = gain.mul(getIUEffect(44,2))
    
    if(hasIU(52)) gain = gain.mul(getIUEffect(52,2))
    if(hasIU(53)) gain = gain.mul(getIUEffect(53,2))
    if(hasIU(54)) gain = gain.mul(getIUEffect(54,2))
    
    if(hasIU(62)) gain = gain.mul(1.75)
    if(hasIU(64)) gain = gain.mul(getIUEffect(54,2))
    return gain.floor()
}