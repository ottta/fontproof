import Grid from "@/components/Grid";
import Layout from "@/components/Layout";

export default function Page() {
    return (
        <Layout>
            <Grid direction="horizontal" paddingInline>
                <Grid direction="vertical" style={{ minHeight: "100vh" }}>
                    Page Reports
                </Grid>
            </Grid>
        </Layout>
    );
}
