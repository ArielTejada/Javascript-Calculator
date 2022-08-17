const numbers = [
    {id: "one", value: '1'}, {id: "two", value: '2'}, {id: "three", value: '3'}, {id: "four", value: '4'}, {id: "five", value: '5'}, {id: "six", value: '6'}, {id: "seven", value: '7'}, {id: "eight", value: '8'}, {id: "nine", value: '9'}, {id: "decimal", value: '.'}, {id: "zero", value: '0'} 
]

const operators = [
    {id: "add", value: '+'},{id: "subtract", value: '-'},{id: "multiply", value: '*'},{id: "divide", value: '/'}
]

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            total: '0',
            clear: true,
            decimal: false,
            history: '',
            operator: '',
            entered: false,
            negative: false,
            canEnterMinus: true
        }

    this.allClear = this.allClear.bind(this);
    this.pressNum = this.pressNum.bind(this);
    this.pressOp = this.pressOp.bind(this);
    this.setTotal = this.setTotal.bind(this);
    this.setHistory = this.setHistory.bind(this);
    this.setEntered = this.setEntered.bind(this);
    this.setNegative = this.setNegative.bind(this);
    this.addNegative = this.addNegative.bind(this);
    }

    allClear(){
        this.setState({
            total: '0',
            clear: true,
            decimal: false,
            history: '',
            operator: '',
            entered: false,
            negative: false,
            canEnterMinus: true
        });
    }

    pressNum(num){

    if(this.state.entered === false) {
        if(this.state.operator != ''){
            this.setState({
                history: this.state.history += this.state.operator,
                operator: '',
                canEnterMinus: true
            })
        }

        if(this.state.clear === true & (num === "." | num === "0")){
        this.setState({
        total: this.state.total,
        clear: true,
        canEnterMinus: true
        });  
        } else if (this.state.clear === true & num != "."){
            this.setState({
            clear: false,
            history: num,
            canEnterMinus: true
            });  
        } else if (this.state.clear === false & num === "." & this.state.decimal === false){
            this.setState({
            decimal: true,
            history: this.state.history += num,
            canEnterMinus: true
            }); 
        } else if (this.state.clear === false & num === "." & this.state.decimal === true){
            this.setState({
            history: this.state.history,
            canEnterMinus: true
            }); 
        } else {
            this.setState({
            history: this.state.history += num,
            canEnterMinus: true
            }); 
        }  
    }
}

    pressOp(op){

        if(op === "-" && this.state.clear === true){
            this.setState({
                history: this.state.history += op,
                canEnterMinus: false,
                clear: false
            })
        }

        if(this.state.clear === false){

            if(this.state.canEnterMinus === true){
                this.setState({
                operator: op,
                decimal: false
                });  
                
                if(this.state.operator != '' && op === "-"){
                    this.setState({
                        history: this.state.history += this.state.operator += op,
                        operator: '',
                        canEnterMinus: false
                    })
                }
            }   
        }         
    }

    setTotal(total){
        this.setState({
            total: total
        })
    }

    setHistory(history){
        this.setState({
            history: history
        })
    }

    setEntered(TF){
        this.setState({
            entered: TF
        })
    }

    setNegative(){
        this.setState({
            negative: true
        }) 
    }

    addNegative(neg){
        this.setState({
            history: this.state.history += this.state.operator += neg,
            operator: '',
            clear: false,
            negative: true
        })
    }

    render(){
        return (
            <div id="calculator">
                <div className="container-fluid h-100">
                    <div>
                        <Display 
                            total={this.state.total}
                            history={this.state.history}
                            op={this.state.operator}
                        />
                    </div>
                </div>
                <div className="button-section container">
                    <div id="number-pad-section" className="row g-0">
                        {numbers.map((number) => (
                            <NumPad
                                {...number}
                                pressNum={this.pressNum}
                            />
                        ))}
                    </div>
                    <div id="operators-section">
                        <div className="row g-0">
                            <div className="col-md-12 col-sm-12">
                                <OpPad 
                                    id="clear" 
                                    value="AC"
                                    allClear={this.allClear}
                                />
                            </div>
                        </div>
                        <div className="row g-0">
                            <div className="row g-0">
                                {operators.map((op) => (
                                    <OpPad
                                        {...op}
                                        pressOp={this.pressOp}
                                        setEntered={this.setEntered}
                                    />
                                ))}
                            </div>
                            <div className="row g-0 h-100">
                                <div className="col-md-12 col-sm-12">
                                <Equals 
                                        id="equals" 
                                        value="="
                                        history={this.state.history}
                                        setTotal={this.setTotal}
                                        setHistory={this.setHistory}
                                        setEntered={this.setEntered}
                                    />
                                </div>
                            </div>
                        </div>                      
                    </div>
                </div>
            </div>
        );
    }
}

class NumPad extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.pressNum(this.props.value);
    }

    render(){
        const num = this.props.value;
        return (
            <div className="numPad text-center col-md-4 col-sm-4" id={this.props.id} onClick={this.handleClick}>
               {this.props.value}
            </div>
        );
    }
}

class OpPad extends React.Component {
    constructor(props){
        super(props);
    this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        if(this.props.id === "clear"){
            this.props.allClear();
        }
        
        if(this.props.id === "add" || this.props.id === "subtract" || this.props.id === "multiply" || this.props.id === "divide"){
            const op = this.props.value;
            this.props.pressOp(op);
            this.props.setEntered(false);
        }

        if(this.props.id === "(-)" && this.props.negative === false){
            this.props.addNegative("-");
            this.props.setNegative;

        }
    }

    render() {
        return (
            <div className="opPad  text-center col-md-6 col-sm-6" id={this.props.id} onClick={this.handleClick}>
                {this.props.id === "(-)" ? this.props.id : this.props.value}
            </div>
        );
    }
}

class Equals extends React.Component {
    constructor(props){
        super(props);

    this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
    const history = this.props.history;
    const total = math.evaluate(history);
    this.props.setTotal(total);
    this.props.setHistory(total);
    this.props.setEntered(true);
    }

    render() {
        return (
            <div id={this.props.id} className="text-center" onClick={this.handleClick}>
                {this.props.value}
            </div>
        );
    }
}

class Display extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        
        return (
            <div
                id="display" 
                className="col-md-12">  
                {this.props.history === '' ? this.props.total : this.props.history}{this.props.op}
            </div>  
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));