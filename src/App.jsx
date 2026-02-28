import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Hello from './01/Hello'
// import Current from './01/Current'
import MyClock from './02/MyClock';
//import MyDiv1 from './03/MyDiv1';
//import MyList from './04/MyList'
//import MyToggle from './05/MyToggle';
import Lotto from './06/Lotto';
//import Food from './07/Food';
//import MyEffect from './08/MyEffect';
import BoxOffice from './09/BoxOffice';
//import Traffic from './10/Traffic';
//import MyRef from './11/MyRef';
//import RefCal from './12/RefCal';
import Gallery from './13/Gallery';
import Festival from './14_1/Festival';
import RouteMain from './15/RouteMain';
import Charge from './16/Charge';
import Header from './components/Header';
import Footer from './components/Footer';
import FestivalContents from './14_1/FestivalContents';
import ChargerStat from './16/ChargerStat';
import CharageDetail from './16/CharageDetail';
//import JotaiCnt from './17/JotaiCnt';
import TodoList from './18_1/TodoList';
import Subway from './19/Subway';
import Login from './Login'

export default function App() {
  return (
    <BrowserRouter>
    <div className='w-full h-screen flex flex-col overflow-y-hidden'>
      <Header/>
      <main className='container mx-auto flex flex-col flex-grow overflow-y-auto'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/lotto" element={<Lotto/>}/>
        <Route path="/box" element={<BoxOffice />}/>
        <Route path="/gallery" element={<Gallery />}/>
        <Route path="/Festival" element={<Festival />}/>
        <Route path="/Festival/contents" element={<FestivalContents />}/>
        <Route path="/Charge" element={<Charge />}/>
        <Route path="/ChargerStat" element={<ChargerStat />}/>
        <Route path="/Charge/detail" element={<CharageDetail />}/>
        <Route path="/TodoList" element={<TodoList />}/>
        <Route path="/Subway" element={<Subway />}/>

      </Routes>
      </main>
    </div>
    </BrowserRouter>
  )
}

      

