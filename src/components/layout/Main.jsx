
import '../../../src/App.css'
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className='headers'>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;