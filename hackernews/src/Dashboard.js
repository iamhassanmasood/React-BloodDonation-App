import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ButtonAppBar from "./Components/UserAppBar";
import * as firebase from "firebase";
import "./firebase-config";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  button: {
    display: "block",
    marginTop: theme.spacing.unit * 4
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
    align: "center"
  },
  button: {
    margin: theme.spacing.unit,
  }
});

// let b = bloodgroup;
// let a = [];
// switch (b) {
//   case "A+":
//     a.push(["A+", "O+", "A-", "O-"]);

//     break;

//   case "B+": {
//     a.push(["B+", "O+", "B-", "O-"]);
//     break;
//   }
//   case "AB+": {
//     a.push(["AB+", "AB-", "O+", "O-", "A+", "A-", "B+", "B-"]);
//     break;
//   }
//   case "O+": {
//     a.push(["O+", "O-"]);
//     break;
//   }
//   case "A-": {
//     a.push(["A-", "O-"]);
//     break;
//   }
//   case "B-": {
//     a.push(["B-", "O-"]);
//     break;
//   }
//   case "AB-": {
//     a.push(["AB-", "O-", "A-", "B-"]);
//     break;
//   }
//   case "O-": {
//     a.push(["O-"]);
//     break;
//   }
// }
// let c = city;
// let a2 = [];
//   case "Karachi": {
//     a.push(["Karachi"]);
//     break;
//   }
//   case "Peshawar": {
//     a2.push(["Peshawar"]);
//     break;
//   }
//   case "Quetta": {
//     a2.push(["Quetta"]);
//     break;
//   }
//   case "Multan": {
//     a2.push(["Multan"]);
//     break;
//   }
//   case "Lahore": {
//     a2.push(["Lahore"]);
//     break;
//   }
//   case "Mianwali": {
//     a2.push(["Mianwali"]);
//     break;
//   }
//   case "Islamabad": {
//     a2.push(["Islamabad"]);
//     break;
//   }
// }
class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      bloodgroup:"",
      city:'',
      newArray: [],
      filterArray:[]
    };
  }
//jb component bn jata hy ye fuction sirf ussi waqt aik baar call hota hy.... agar hum ny setState ko foran render
// karwana ho humm phirr bhii isi ko use karty hain componentDidMount. ye function browser ki screen update hony 
//se pehly chalta hy
  componentDidMount() {
    this.getData();
  }
  //getData function me ny iss liye bnaya taa k firebase se user ka data hasil karon 
  //user k data me jo kuch mojood hota hy wo user k child hotty hain
  // ab ref() hamara reference hy jo ye btata hy k data kahan ja raha hy ya data kahan se aa raha hy 
  // matlab ye k ref() is just indicator where the data should go
  // child hamary data ki exact location hy 
  getData = () => {
    firebase
      .database()
      .ref("users")
      .once("value")
  //snapshot data ki picture hy
      .then(snapshot => {
        const data = snapshot.val();
        const array = [];
        for (let key in data) {
          array.push(data[key]);
        }
  //array me wo tamam data hoga humain array ko search k liye filter karna hy 
        this.setState({
           newArray: array,
           filterArray: array  
        });
      });
  };

//   getCityName = (city) => {
// this.setState({city:city})
//   }

//   getBloodGroup=(bloodgroup)=>{
//     this.setState({bloodgroup:bloodgroup})
    
//   }


// ab aik aeisa event handler bnaya jaye jo city or blood k selection box pe operate ho
  handleChange = event => {
    this.setState({ 
      [event.target.name]: 
      event.target.value 
    });
  };
  //button k liye function bnaya 
  handleClick=()=>{
      const {newArray, bloodgroup, city} = this.state;

      const filter = newArray.filter(arr => 
        (bloodgroup == "" || arr.bloodgroup == bloodgroup) && 
        (city == "" || arr.city == city)
      );

      this.setState({
        filterArray: filter
      })
  }

  render() {
    const { classes } = this.props;
    const {filterArray, bloodgroup, city} = this.state;

    return (
      <Paper>
      <ButtonAppBar />
      <div className="Dropdown">
        <div>
          <form autoComplete="off" >
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-controlled-open-select">
                Bloodgroup
              </InputLabel>
              <Select
                value={bloodgroup}
                onChange={this.handleChange}
                inputProps={{
                  name: "bloodgroup",
                  id: "demo-controlled-open-select"
                }}
              >
                <MenuItem value={"A+"}>A+</MenuItem>
                <MenuItem value={"A-"}>A-</MenuItem>
                <MenuItem value={"B+"}>B+</MenuItem>
                <MenuItem value={"B-"}>B-</MenuItem>
                <MenuItem value={"O+"}>O+</MenuItem>
                <MenuItem value={"O-"}>O-</MenuItem>
                <MenuItem value={"AB+"}>AB+</MenuItem>
                <MenuItem value={"AB-"}>AB-</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-controlled-open-select">
                City
              </InputLabel>
              <Select
                value={city}
                onChange={this.handleChange}
                inputProps={{
                  name: "city",
                  id: "demo-controlled-open-select"
                }}
              >
                <MenuItem value={"Islamabad"}>Islamabad</MenuItem>
                <MenuItem value={"Karachi"}>Karachi</MenuItem>
                <MenuItem value={"Lahore"}>Lahore</MenuItem>
                <MenuItem value={"Quetta"}>Quetta</MenuItem>
                <MenuItem value={"Mianwali"}>Mianwali</MenuItem>
                <MenuItem value={"Multan"}>Multan</MenuItem>
                <MenuItem value={"Peshawar"}>Peshawar</MenuItem>
              </Select>
            </FormControl>
          <Button
           style={{
            margin: 16,
            color: 'white',
            padding: '5px 10px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            borderRadius: '10%',
            marginLeft:'40px',
            backgroundColor:"#3f51b5"

          }}
          onClick={this.handleClick}
          > Search </Button>
          </form>
        </div>
      </div>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell> First Name </CustomTableCell>
              <CustomTableCell> Last Name </CustomTableCell>
              <CustomTableCell> Age </CustomTableCell>
              <CustomTableCell> Gender </CustomTableCell>
              <CustomTableCell> Blood Group </CustomTableCell>
              <CustomTableCell> Contact </CustomTableCell>
              <CustomTableCell> City </CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterArray.map((item, index) => (
              <TableRow key={index}>
                <CustomTableCell>{item.firstname}</CustomTableCell>
                <CustomTableCell>{item.lastname}</CustomTableCell>
                <CustomTableCell>{item.age}</CustomTableCell>
                <CustomTableCell>{item.gender}</CustomTableCell>
                <CustomTableCell>{item.bloodgroup}</CustomTableCell>
                <CustomTableCell>{item.mobileno}</CustomTableCell>
                <CustomTableCell>{item.city}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired

};

export default withStyles(styles)(Dashboard);