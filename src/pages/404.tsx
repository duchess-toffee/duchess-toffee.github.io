import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Helmet } from "react-helmet";

import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Image404 from "../images/background/404-lost-in-space.png";

import Layout from "../components/layouts/layout";
import Divider from "../components/dividers/main-divider";
import darkTheme from "../styling/themes/dark-theme";
import lightTheme from "../styling/themes/light-theme";
import FONT_STYLES, { FONT_SIZES } from "../styling/font-styles";
import COLORS from "../styling/colors";

const useStyles = makeStyles(theme => ({
	text: {
		padding: theme.spacing(5, 2),
	},
	title: {
		...FONT_STYLES.title,
		color: COLORS.white,
		[theme.breakpoints.down("xs")]: {
			fontSize: FONT_SIZES.large,
		},
	},
	description: {
		...FONT_STYLES.subtitle,
		color: COLORS.white,
	},
	image: {
		width: "90vw",
		height: "70vh",
		[theme.breakpoints.down("xs")]: {
			height: "50vh",
		},
	},
}));
export default function PageNotFound() {
	const classes = useStyles();
	const [theme, setTheme] = useState(false);
	const [sectionIndex] = useState(0);

	if (typeof window !== "undefined") {
		require("smooth-scroll")('a[href*="#"]');
	}

	const image = useStaticQuery(graphql`
		query {
			allFile(filter: { relativeDirectory: { regex: "/images/background/" } }) {
				edges {
					node {
						name
						childImageSharp {
							fluid(quality: 100) {
								...GatsbyImageSharpFluid
							}
						}
					}
				}
			}
		}
	`);

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>404 Page Not Found</title>
				<meta name="description" content="404 Page Not Found on Hannah Ong's site." />
			</Helmet>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<Layout index={sectionIndex} onTheme={setTheme}>
					<Grid container direction="column" alignItems="center">
						<Grid container direction="column" alignItems="center" spacing={6} className={classes.text}>
							<Grid item>
								<Typography variant="h1" align="center" className={classes.title}>
									Page Not Found
								</Typography>
							</Grid>

							<Grid item>
								<Typography variant="h2" align="center" className={classes.description}>
									Whoops! Looks like the page you're looking for is not available.
								</Typography>
							</Grid>

							<Grid item>
								<Divider />
							</Grid>
						</Grid>

						<Grid item>
							<Img
								fluid={image.allFile.edges[0].node.childImageSharp.fluid}
								alt={image.allFile.edges[0].node.name}
								imgStyle={{ objectFit: "contain" }}
								className={classes.image}
							/>
						</Grid>
					</Grid>
				</Layout>
			</ThemeProvider>
		</>
	);
}
