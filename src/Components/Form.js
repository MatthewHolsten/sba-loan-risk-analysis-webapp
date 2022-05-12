import React, {useState} from 'react'
import {useForm} from "react-hook-form"
import QueryAPI from "./QueryAPI"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object().shape({
    loan_amt:       yup.number().required().min(0),
    sba_loan_amt:   yup.number().required().min(0),
    sba_prop:       yup.number().required().max(1).min(0),
    term:           yup.number().required().min(0),
    jobs:           yup.number().required().min(0),
    ind_code:       yup.number().required().min(0),
    state:          yup.string().required().matches(/(^[A-Z]{2}$)/),
    model:          yup.string().required().default('country'),
    admin:          yup.string().required(),
    density:        yup.string().required(),
    recession:      yup.bool().required().default(false),
});

function Form() {

    const [url, setUrl] = useState("");

    const { register, handleSubmit, formState, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (input_data) => {
        console.log("Input data: ", input_data)
        const url_str = makeURL(input_data)
        console.log("Url querying: ", makeURL(input_data));
        setUrl(url_str)
    };

    const makeURL = (data) => {

        const url_home = "https://matthewholsten.pythonanywhere.com/";
        const url_start = "api/sba-loan-risk-analysis/query/";

        const full_url = url_home + url_start +
            "?loan_amt="      + data.loan_amt      +
            "&sba_loan_amt="  + data.sba_loan_amt  +
            "&sba_prop="      + data.sba_prop      +
            "&term="          + data.term          +
            "&jobs="          + data.jobs          +
            "&ind_code="      + data.ind_code      +
            "&state="         + data.state         +
            "&model="         + data.model.toLowerCase()         +
            "&admin="         + data.admin         +
            "&density="       + data.density       +
            "&recession="     + data.recession;

            return full_url;
    }

    const populateRandom = () => {

        const rand_loan_amt     = Math.floor(Math.random() * 1000 + 1) * 1000;
        const rand_sba_prop     = (Math.floor(Math.random() * (80 - 20)) + 20) / 100;
        const rand_sba_loan_amt = Math.floor(rand_loan_amt * rand_sba_prop);
        const rand_term         = Math.floor(Math.random() * (200 - 12)) + 12;
        const rand_jobs         = Math.floor(Math.random() * (250 - 10)) + 10;
        const rand_ind_code     = Math.floor(Math.random() * 70) + 10;

        const rand_admin        = {0: 'd', 1: 'r'}[Math.floor(Math.random() * 2)];
        const rand_density      = {0: 'undefined', 1: 'urban', 2: 'rural'}[Math.floor(Math.random() * 3)];
        const rand_recession    = !Math.floor(Math.random() * 4); // Note the !, *4 ==> weighted odds
        const rand_model        = "Country"; //TODO change when multi-model is implemented

        const states_dict = {
            1: 'AK', 2: 'AL', 3: 'AR', 4: 'AZ', 5: 'CA',
            6: 'CO', 7: 'CT', 8: 'DC', 9: 'DE', 10: 'FL',
            11: 'GA', 12: 'HI', 13: 'IA', 14: 'ID', 15: 'IL',
            16: 'IN', 17: 'KS', 18: 'KY', 19: 'LA', 20: 'MA',
            21: 'MD', 22: 'ME', 23: 'MI', 24: 'MN', 25: 'MO',
            26: 'MS', 27: 'MT', 28: 'NC', 29: 'ND', 30: 'NE',
            31: 'NH', 32: 'NJ', 33: 'NM', 34: 'NV', 35: 'NY',
            36: 'OH', 37: 'OK', 38: 'OR', 39: 'PA', 40: 'RI',
            41: 'SC', 42: 'SD', 43: 'TN', 44: 'TX', 45: 'UT',
            46: 'VA', 47: 'VT', 48: 'WA', 49: 'WI', 50: 'WV', 51: 'WY'
        }

        const rand_state = states_dict[Math.floor(Math.random() * 51) + 1];

        // const rand_ind_code     = Math.floor(Math.random() * (10000 - 1000)) + 1000;
        // const rand_ind_code     = Math.floor(Math.random() * (10000 - 1000)) + 1000;
        // const rand_ind_code     = Math.floor(Math.random() * (10000 - 1000)) + 1000;

        setValue('loan_amt', rand_loan_amt);
        setValue('sba_loan_amt', rand_sba_loan_amt);
        setValue('sba_prop', rand_sba_prop);
        setValue('term', rand_term);
        setValue('jobs', rand_jobs);
        setValue('ind_code', rand_ind_code);
        setValue('state', rand_state);
        setValue('model', rand_model);
        setValue('admin', rand_admin);
        setValue('density', rand_density);
        setValue('recession', rand_recession);


        return;
    }

    console.log('Errors', formState.errors);

    return (
        <div className="Form">
            <h2 className="title"> <b>
            &nbsp;
            SBA Loan Analysis Tool
            </b></h2>

            <h5>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Tufts University, Spring 2022
            <br />

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; for CS-135: Intro to Machine Learning
            <br />

            &nbsp;&nbsp;&nbsp;&nbsp;
            by <a href="https://github.com/MatthewHolsten">Matt Holsten</a> ('24), <a href="https://github.com/rpitkin19">Rob Pitkin</a> ('23)
            <br />

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Check out this project's <a href="https://github.com/MatthewHolsten/sba-loan-risk-analysis">GitHub</a>!
            <br />

            </h5>
            <div className="float-container">
            <div className="inputTitles">

            </div>

            <div className="inputFields">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label>
                    &nbsp;
                    Lender Loan
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="loan_amt" {...register("loan_amt")} placeholder="US Dollars (ex: 10000)"/>
                    </label>
                    <br /><br />

                    <label>
                    &nbsp;
                    SBA Guaranty
                    &nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input type="text" id="sba_loan_amt" {...register("sba_loan_amt")} placeholder="US Dollars (ex: 5000)"/>

                    <br /><br />


                    <label>
                    &nbsp;
                    Guaranty %
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="sba_prop" {...register("sba_prop")} placeholder="Decimal (ex: 0.5)"/>
                    </label>
                    <br /><br />

                    <label>&nbsp;
                    Term Length
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="term" {...register("term")} placeholder="Months (ex: 120)"/>
                    </label>
                    <br /><br />

                    <label>
                    &nbsp;
                    Jobs Retained
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="jobs" {...register("jobs")} placeholder="Total (ex: 100)"/>
                    </label>
                    <br /><br />

                    <label>
                    &nbsp;
                    Industry Code&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="ind_code" {...register("ind_code")} placeholder="ID Number (ex: 42)"/>
                    </label>
                    <br /><br />

                    <label>&nbsp;
                    State
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="text" id="state" {...register("state")} placeholder="Abbreviation (ex: VA)"/>
                        </label>
                    <br /><br />

                    <label>&nbsp;
                    Trained Model
                    &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="text" value="Country" id="model" {...register("model")} placeholder="State Abbrev or 'Country' " readOnly/>
                        </label>
                    <br /><br />

                    <label>
                    &nbsp;
                    Admin. Party
                    &nbsp; </label>
                        <label>
                        <input type="radio" id="admin_d" {...register("admin")} name="admin" value="d" />
                        Democrat&nbsp;
                        </label>

                        <label>
                        <input type="radio" id="admin_r" {...register("admin")} name="admin" value="r" />
                        Republican
                        </label>
                    <br /><br />

                    <label>
                    &nbsp;
                    Pop. Density
                        &nbsp; </label>
                        <label>
                        <input type="radio" id="density_rural" {...register("density")} name="density" value="rural" />
                        Rural&nbsp;
                        </label>

                        <label>
                        <input type="radio" id="density_urban" {...register("density")} name="density" value="urban" />

                        Urban&nbsp;
                        </label>

                        <label>
                        <input type="radio" id="density_undefined" {...register("density")} name="density" value="undefined" />
                        NA
                        </label>
                    <br /><br />

                    <label>
                    &nbsp;
                    Time Period
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <label>
                    <input type="checkbox" id="recession" {...register("recession")} name="recession" value="1"/>

                    Recession
                    </label>

                    <br /><br />

                    &nbsp;

                    <input type="reset"/>


                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <button onClick={populateRandom}>Generate Random</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="submit" id="submit"/>&nbsp;&nbsp;




                </form>

            </div>
            </div>
            <br /><br />
            <b>&nbsp;Model Prediction:&nbsp;&nbsp; </b>
            <em><QueryAPI query_url={url}/></em>
            <br /><br /><br /><br />
            <br /><br /><br /><br />


        </div>
    );
}

export default Form;
