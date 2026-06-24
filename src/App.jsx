import React  from "react";
import { BrowserRouter,Routes, Route,Link } from "react-router-dom";
import { Home } from "./Home";
import "./App.css"
import { useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
let CountForGold = (n,u) => {
    let check = 'gr' == u
    n = check ? n : n * 1000 
    let result = (n*25.2)/90
    return result   
}
let CountForSilver = (n,u) => {
    let check = 'gr' == u
    n = check ? n : n * 1000
    let result = (n*75.15)/630
    return result
}
let kindOfAnimal = ['Sheeps 🐑 or Ewes 🐐','Cows 🐄 or Buffaloes 🐃','Camels 🐪']
let kinOfJews = ['Golden 🥇','Silver 🥈']
let UnitForJews = ['kg','gr']
let UnitForHusbandary = ['kg','7kg']
let kindOfHusbandry = ['Grown by them self','Grown by your effort']
let typeOfCows = {age: ['1 years old','2 years old']}
let App = () => {
    let [CurrentValue, setCurrentValue] = useState('None')
    let [zakatValue,setzakatValue] = useState('value')
    let [wealthCount,setwealthCount] = useState(null)
    let [unitToggle,setUnitToggle] = useState(null)
    let [unit,handleUnit] = useState('None')
    let CheckForMaxMatching = (l,n) => {
        for (let i = n; i >= 5; i--){
            if (l.hasOwnProperty(i)){
                return i
            }else
                continue
        }
    }
    let valueReturner = (obj,i = 0)=> {
        let funcVariable = ''
        {obj[91].count > 1 ? obj[91].kind += 'es': obj[91].kind += ''}
        funcVariable +=`${obj[91].count} ${ obj[91].kind} ${obj[91].age} years old. \n`
        if (i !== 0){
            {obj[i].count > 1 ? obj[i].kind += 'es': obj[i].kind += ''}
            if (i>20)
            funcVariable +=`${obj[i].count} ${obj[i].kind} ${obj[i].age} years old. \n`
            else
            funcVariable +=`${obj[i].count} ${obj[i].kind}.`
        }
        return funcVariable
    }
    let countForZakat = () => {
        if (CurrentValue && wealthCount){
            let test = unit == 'kg';
            console.log(test);
            let check = test ? wealthCount * 1000  : wealthCount ;
            console.log(check);
            let unitChecking = ''
            let for30 = 0
            let for40 = 0
            let Pluralition30 = ''
            let Pluralition40 = ''
            let result = ''
            let forCamels = {
            5: {kind: 'ewe', count: 1},
            10: {kind: 'ewe',count: 2},
            15: {kind: 'ewe', count: 3},
            20: {kind: 'ewe',count: 4},
            25: {kind: 'calf',count: 1, age: 1},
            36: {kind: 'claf  ', count: 1, age: 2 },
            46: {kind: 'calf',count: 1,age: 3},
            61: {kind: 'calf', count: 1, age: 4},
            76: {kind: 'calf', count: 2,age: 2},
            91: {kind: 'calf', count: 2, age: 3}
            }
            let CamelsZakaValues = {}
            switch(CurrentValue){
                case 'Sheeps 🐑 or Ewes 🐐':
                    setUnitToggle('')
                    if (Number(wealthCount)<40){
                        result = "Nothing, you are not able in this amount of wealth."
                        setzakatValue(result)
                    }
                    else{
                        if (Number(wealthCount)<=120){
                            result = "1 Ewe or sheep."
                            setzakatValue(result)
                        }
                        else{
                            if (Number(wealthCount)<=200){
                                result = "2 Ewes or sheeps."
                                setzakatValue(result)
                                }
                            else{
                                if (Number(wealthCount)<=300){
                                    result = "3 Ewes or sheeps."
                                    setzakatValue(result)
                                }
                                else{
                                    result = Math.floor((Number(wealthCount) / 100)) + " Ewes or sheeps."
                                    setzakatValue(result)
                            }
                        }  
                    }
                }
                break
                case 'Cows 🐄 or Buffaloes 🐃':
                    setUnitToggle('')
                    if (Number(wealthCount) < 30)
                        setzakatValue(0)
                    else{
                        if (39>=Number(wealthCount)){
                            setzakatValue(1 + ' ewe ' + typeOfCows.age[0] )
                        }
                        else{
                            if (59>=Number(wealthCount)){
                                setzakatValue(1 + ' ewe ' + typeOfCows.age[1] )
                            }
                            else{
                                if (!(wealthCount % 30 && wealthCount % 40)){
                                    for30 = wealthCount % 30
                                    for40 = wealthCount % 40
                                    let DividOn30 = Math.floor(wealthCount/30)
                                    let DividOn40 = Math.floor(wealthCount/40)
                                    Pluralition30 = DividOn30 > 1 ? 'ewes' : 'ewe' 
                                    Pluralition40 = DividOn40 > 1 ? 'ewes' : 'ewe' 
                                    let dividFor = !for30 ?  DividOn30 + ' ' + Pluralition30 +' one years old.'  : DividOn40 + ' ' + Pluralition40 +' two years old.';
                                    setzakatValue(dividFor)
                                }else{
                                let TempWealth = Number(wealthCount)
                                for (TempWealth; TempWealth >= 30 ;){
                                    if (!(TempWealth % 40) && TempWealth != 0){
                                        for40 += TempWealth / 40
                                        break
                                    }
                                    else{
                                        TempWealth -= 30
                                        for30 += 1
                                    }
                                }
                                    Pluralition30 = for30 > 1 ? ` ewes one year old. ` : ` ewe one years old.` 
                                    Pluralition40 = for40 > 1 ? ' ewes two years old ' : ' ewe tow years old'
                                    for30  = for30 > 0 ? (for30 + Pluralition30) : ''
                                    for40  = for40 > 0 ? (for40 + Pluralition40) : ''
                                    let prep = for30 && for40 ? ' and ' : ''
                                    result = for40 + prep + for30   
                                    setzakatValue(result)
                            }
                        }
                    }
                }
                break
                case 'Camels 🐪':
                    setUnitToggle('')
                    if (wealthCount < 5){
                        setzakatValue('You are not able.')
                    }else{
                        if ( wealthCount <=9){
                            setzakatValue('One ewe.')
                        }else{
                            if(wealthCount <= 14){
                                setzakatValue('Two ewes.')
                            }else{
                                if(wealthCount <= 19){
                                    setzakatValue('Three ewes.')
                                }else{
                                    if (wealthCount <= 24){
                                        setzakatValue('Four ewes.')
                                    }else{
                                        if (wealthCount <= 35){
                                            setzakatValue('One year old calf.')
                                        }else{
                                            if(wealthCount <= 45){
                                                setzakatValue('Two years old calf.')
                                            }else{
                                                if(wealthCount <= 60){
                                                    setzakatValue('Three years old calf.')
                                                }else{
                                                    if (wealthCount <= 75){
                                                        setzakatValue('Four years old calf.')
                                                    }else{
                                                        if (wealthCount <= 90){
                                                            setzakatValue('2 Two years old calf.')
                                                        }else{
                                                            if(wealthCount <= 120){
                                                                setzakatValue('2 Three years old calf.')
                                                            }else{
                                                                let countof120s = Math.floor( wealthCount / 120 )
                                                                let alivenNumbers = wealthCount % 120
                                                                CamelsZakaValues[91] = {count: forCamels[91].count, age: forCamels[91].age, kind: forCamels[91].kind} 
                                                                CamelsZakaValues[91].count *= Number(countof120s) 
                                                                let index = CheckForMaxMatching(forCamels,alivenNumbers) ? CheckForMaxMatching(forCamels,alivenNumbers) : null
                                                                if (index !== null){
                                                                    if (CamelsZakaValues.hasOwnProperty(index)){
                                                                        CamelsZakaValues[index].count += forCamels[index].count
                                                                        result = valueReturner(CamelsZakaValues)
                                                                    }
                                                                    else{
                                                                        CamelsZakaValues[index] = forCamels[index]
                                                                        result = valueReturner(CamelsZakaValues,index)
                                                                    }
                                                                }
                                                                else{
                                                                    result = valueReturner(CamelsZakaValues)
                                                                }
                                                                setzakatValue(result)                       
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                break
                case 'Golden 🥇':
                    if(check>=90 ){
                        result = CountForGold(wealthCount,unit)
                        console.log(result);
                        
                        setzakatValue(result )
                        unitChecking = test ? 'gr' : unit
                        setUnitToggle(unitChecking)
                    }else{
                        result = 'You are not able yet.'
                        setzakatValue(result)
                    }
                    break
                case 'Silver 🥈':
                    if ( check >= 630){
                        result = CountForSilver(wealthCount,unit)
                        // console.log(result);
                        setzakatValue(result )
                        unitChecking = test ? 'gr' : unit
                        setUnitToggle(unitChecking)
                    }else{
                        result = 'You are not able yet.'
                        setzakatValue(result)
                        setUnitToggle(test ? 'gr' : unit)
                    }
                    break
                case 'Grown by them self':
                    
                    result = Number(wealthCount) / 10
                    setzakatValue(result)
                    unitChecking = test ? 'gr' : unit
                    setUnitToggle(unitChecking)
                    break
                case 'Grown by your effort':
                    result = Number(wealthCount) / 20
                    setzakatValue(result)
                    unitChecking = test ? 'gr' : unit
                    setUnitToggle(unitChecking)
                        }
                    }
                }
        return(
        <div className="page app ">
            <h1 className="btn"><b>Z</b>akat <b style={{color: 'greenyellow'}}>t</b>racker</h1>
            <div className="selects controls-row btn">
                <div id=" arrange " className="controls-row btn">
                <div className="select">
                    <div className="label">
                        <label className="btn">Animales</label>
                        <select className="btn" onChange={e => setCurrentValue(e.target[e.target.selectedIndex].value)}>
                        {kindOfAnimal.map((e,i)=> {
                            return(
                                <option className="btn" value={e}>{e}</option>
                            )
                        })}
                        </select>
                    </div>
                </div>
                <div className="select">
                    <div className="label">
                            <label className="btn">Unit</label>
                            <select className="btn" onChange={e => handleUnit(e.target[e.target.selectedIndex].value)} >
                                <option className="btn" value={UnitForJews[0]}>{UnitForJews[0]}</option>
                                <option className="btn" value={UnitForJews[1]}>{UnitForJews[1]}</option>
                            </select>
                    </div>
                    <div className="label ">
                            <label className="btn">Jews</label>
                        <select className="btn" onChange={e => setCurrentValue(e.target[e.target.selectedIndex].value)}>
                                {kinOfJews.map((e,i)=> {
                                    return(
                                        <option className="btn" value={e}>{e}</option>
                                    )
                                })}
                        </select>
                    </div>
                
                </div>
                </div>
                <div className="select husbundcollect btn cotrolrs-row">
                    <div className="label">
                        <label className="btn" >Unit</label>
                        <select className="btn" onChange={e => handleUnit(e.target[e.target.selectedIndex].value)} >
                            <option className="btn" value={UnitForHusbandary[0]}>{UnitForHusbandary[0]}</option>
                            <option className="btn" value={UnitForHusbandary[1]}>{UnitForHusbandary[1]}</option>
                        </select>
                    </div>
                    <div className="HusundarValue">
                        <label className="btn">Farm</label>
                        <select className="btn" onChange={e => setCurrentValue(e.target[e.target.selectedIndex].value)}>
                            {kindOfHusbandry.map((e,i)=> {
                                return(
                                    <option className="btn" value={e}>{e}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                        
            </div>
            <div className="Input">
                <div id="CurrentSelect"><h3>Counting zakat for: <h5 style={{margin: '0'}} className="msg">{CurrentValue}</h5> <div> Unit: <h5 className="msg"> {unit}</h5></div></h3></div>
                <input className="msg" value={wealthCount} type="number" placeholder="How much do have? : " onChange={e => setwealthCount(e.target.value)
                } />
                <button className="msg" onClick={(e)=> countForZakat()}>Count for Zakat</button>
            </div>
                <div id="zakat">
            <div className="content msg">
                    <h1>You must give in zakat : </h1>
                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '5px'}}><span style={{color: "greenyellow",margin: '5px 0 0 5px'}}> <h2> {zakatValue} </h2></span>
                    <h5 style={{color: 'greenyellow', marginTop: '20px'}}>{unitToggle}</h5></div>
            </div>
                </div>
            </div>
    )   
}

export default App;