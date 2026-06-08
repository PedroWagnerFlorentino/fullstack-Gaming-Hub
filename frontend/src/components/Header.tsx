interface HeaderProps {
    title: string;
    count: number;
}

function Header({ title, count }: HeaderProps){
    return(
        <header>
            <h1>{title}</h1>
            <p>{count}</p>
        </header>
    );
}

export default Header;