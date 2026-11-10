
function Footer() => {
    const year = new Date().getFullYear();
    return (
        <footer
            style={{
                textAlign: 'center',
                padding: '20px 0',
                marginTop: 32,
                borderTop: '1px solid #e0e0e0',
                color: '#888',
                fontSize: 14,
            }}
        >
        {year} Каталог студентов. Все права защищены.
        </footer>
    );
}

export default Footer;