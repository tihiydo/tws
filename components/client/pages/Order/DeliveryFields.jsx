import {Autocomplete, FormControl, InputLabel, MenuItem, TextField} from "@mui/material";
import Select from "@mui/material/Select";
import { useTranslations } from "next-intl";
import {useEffect, useState} from "react";

const DeliveryFields = ({methods}) => {
    const [departments, setDepartments] = useState([])
    const [cities, setCities] = useState([])
    const [cityRef, setCityRef] = useState(null)
    const [cityQuery, setCityQuery] = useState('')

    const fetchDepartments = async (cityRef) => {
        try {
            // console.log('CITYREF', cityRef)
            const body = JSON.stringify({
                apiKey: "deff54a527f8b61766e6b477f6a81e27",
                modelName: "Address",
                calledMethod: "getWarehouses",
                methodProperties: {
                    CityRef: cityRef,
                    Limit: "50",
                    TypeOfWarehouseRef: "9a68df70-0267-42a8-bb5c-37f427e36ee4"
                }
            })
            const res = await fetch('https://api.novaposhta.ua/v2.0/json/', {
                method: 'POST',
                body: body
            })
            const json = await res.json();
            // console.log(json)
            return json?.data?.map(depart => depart.Description);
        } catch (e) {
            console.error(e)
            alert('Error')
        }

    }

    const fetchCities = async (cityName) => {
        try {
            const body = JSON.stringify({
                apiKey: "deff54a527f8b61766e6b477f6a81e27",
                modelName: "Address",
                calledMethod: "searchSettlements",
                methodProperties: {
                    CityName: cityName,
                    Limit: "10",
                }
            })
            const res = await fetch('https://api.novaposhta.ua/v2.0/json/', {
                method: 'POST',
                body: body
            })
            const json = await res.json();

            console.log('CITES JSON ========', json)
            return json?.data?.[0]?.Addresses?.map(address => ({label: address?.Present, value: address.DeliveryCity}));
        } catch (e) {
            console.error(e)
            alert('Error')
        }

    }


    // useEffect(() => {
    //     (async () => {
    //         methods.setValue('department', '')
    //         const departs = await fetchDepartments(cityRef);
    //         setDepartments(departs);
    //     })()
    // }, [cityRef])


    useEffect(() => {
        (async () => {
            methods.setValue('department', '')
            const departs = await fetchDepartments(cityRef);
            setDepartments(departs);
        })()
    }, [])


    useEffect(() => {
        (async () => {
            methods.setValue('city', '')
            const cities = await fetchCities(cityQuery);
            console.log('cities', cities)
            if (cities?.length) {
                setCities(cities);
            } else {
                setCities([])
            }
        })()
    }, [cityQuery])

    useEffect(() => {
        (async () => {
           await methods.trigger('city')
            methods.setValue('department', '')
            const departs = await fetchDepartments(cityRef);
            console.log(departments, 'departs')
            setDepartments(departs);
        })()
    }, [methods.watch('city')])

    const form = useTranslations("form")
    const validation = useTranslations("validation")

    return (
        <>
            {/*<div>*/}
            {/*    {cityRef}*/}
            {/*</div>*/}
            <FormControl fullWidth style={{position: 'relative', marginBottom: 20}}>
                <p style={{
                    fontSize: 13,
                    color: "#b4b4b4",
                    marginBottom: 10,
                }}>
                    {
                        form("startTyping")
                    }
                </p>


                <Autocomplete
                    options={cities}
                    color={'primary'}
                    size={'small'}
                    sx={{borderRadius: 2, marginBottom: 1}}
                    value={methods.watch('city')}
                    isOptionEqualToValue={(option, value) => option.value === cityRef}
                    onChange={(event, newValue) => {
                        setCityRef(newValue?.value)
                        methods.setValue('city', newValue?.label)
                    }}
                    noOptionsText={validation("noCity")}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={form("city")}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                },
                                "& .MuiAutocomplete-inputRoot": {
                                    borderRadius: "12px"
                                },
                            }}
                            value={cityQuery}
                            onChange={(event) => setCityQuery(event.target.value)}
                        />
                    )}
                />


                {!!methods.formState.errors?.["city"] &&
                    <p style={{
                        fontSize: 13,
                        color: "#f52323",
                        position: 'absolute',
                        bottom: -20
                    }}>
                        {methods.formState.errors?.["city"]?.message ?? ''}
                    </p>
                }
            </FormControl>

            {methods.watch('city') &&
                <>
                    {departments?.length
                        ?
                        <FormControl fullWidth style={{position: 'relative', marginBottom: 25}}>
                            <InputLabel>
                                {
                                    form("department")
                                }
                            </InputLabel>
                            <Select
                                label={form("department")}
                                color={'primary'}
                                noOptionsText={form("noCity")}
                                size={'small'}
                                sx={{borderRadius: 2}}
                                {...methods.register('department')}
                            >
                                {departments?.map(depart =>
                                    <MenuItem value={depart}>{depart}</MenuItem>
                                )}
                            </Select>

                            {!!methods.formState.errors["department"] &&
                                <p style={{
                                    fontSize: 13,
                                    color: "#f52323",
                                    position: 'absolute',
                                    bottom: -20
                                }}>
                                    {methods.formState.errors["department"]?.message ?? ''}
                                </p>
                            }
                        </FormControl>
                        : <div style={{marginBottom: 20}}>
                            {
                                validation("noDepartment")
                            }
                        </div>
                    }

                </>
            }


        </>

    );
};

export default DeliveryFields;