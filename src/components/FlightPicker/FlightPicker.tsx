import { Autocomplete, AutocompleteProps, Grid } from "@mantine/core";

export function FlightPicker(props: AutocompleteProps) {
    return (
        <Grid >
            <Grid.Col span={{ base: 6 }}>
                <Autocomplete
                    label="De onde?"
                    placeholder="País, cidade, Aeroporto"
                    {...props}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 6 }}>
                teste
            </Grid.Col>
        </Grid>
    )
}