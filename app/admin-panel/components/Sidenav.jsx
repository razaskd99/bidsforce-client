import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Typography,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListItemIcon from "@mui/material/ListItemIcon";
import Radio from "@mui/material/Radio";

export default async function SideNavAdminPanel(props) {
  const sideNavData = [
    { icon: "/ico.svg", text: "Tenants", link: "/controlpanel/auth/members" },
    {
      icon: "/bids.svg",
      text: "Register Tenant",
      link: "/controlpanel/auth/register",
    },
    {
      icon: "/contacts.png",
      text: "Change Password",
      link: "/controlpanel/auth/password",
    },
  ];

  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-[#252631] shadow-lg "
    >
      <div className="app-brand demo">
        <Link href={props.homeURL} className="app-brand-link d-block">
          <span className="app-brand-logo demo me-1">
            <span style={{ color: "var(--bs-primary)" }} className="bg-dark">
              <Image
                src="/Logo.png"
                alt="Bid Force"
                width={370}
                height={90}
                className="w-100"
              />
            </span>
          </span>
        </Link>

        <Link
          href="javascript:void(0);"
          className="layout-menu-toggle menu-link no-underline text-large ms-auto"
        >
          <i className="mdi menu-toggle-icon d-xl-block align-middle mdi-20px"></i>
        </Link>
      </div>
      <div className="menu-inner-shadow"></div>
      <List component="nav">
        {/* Admin Dashboards */}
        <ListItem >
          <ListItemText
            primary={
              <Typography variant="h6" color="primary">
                Admin Dashboards
              </Typography>
            }
          />
        </ListItem>

        {/* USERS */}
        <Accordion
          className="bg-[#252631] text-white"
          style={{ background: "#252631" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="text-white" />}
          >
            <ListItemText
              primary={
                <Typography variant="p" color="white" className="text-base">
                  USERS
                </Typography>
              }
            />
          </AccordionSummary>
          <AccordionDetails>
            <List component="div" disablePadding>
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/users"
                  passHref
                >
                  <ListItemText primary="Users" />
                </Link>
              </ListItem>

                           
              {/* <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/companies"
                  passHref
                >
                  <ListItemText primary="Companies" />
                </Link>
              </ListItem> 
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/designation"
                  passHref
                >
                  <ListItemText primary="Designations" />
                </Link>
              </ListItem>*/}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Persona */}
        <Accordion
          className="bg-[#252631] text-white"
          style={{ background: "#252631" }}
        >
          <AccordionSummary
            className="m-0"
            expandIcon={<ExpandMoreIcon className="text-white m-0" />}
          >
            <ListItemText
              className="m-0"
              primary={
                <Typography variant="p" color="white" className="text-base">
                  PERSONA
                </Typography>
              }
            />
          </AccordionSummary>
          <AccordionDetails>
            <List component="div" disablePadding>
              
            <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/persona"
                  passHref
                >
                  <ListItemText primary="Persona List" />
                </Link>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Funtional Group */}
        <Accordion
          className="bg-[#252631] text-white"
          style={{ background: "#252631" }}
        >
          <AccordionSummary
            className="m-0"
            expandIcon={<ExpandMoreIcon className="text-white m-0" />}
          >
            <ListItemText
              className="m-0"
              primary={
                <Typography variant="p" color="white" className="text-base">
                  FUNCTIONAL GROUP
                </Typography>
              }
            />
          </AccordionSummary>
          <AccordionDetails>
            <List component="div" disablePadding>
              <ListItem  className="py-0 text-[#cecece]">
                  <Link
                    className="no-underline text-[#cecece]"
                    href="/admin-panel/functional-group"
                    passHref
                  >
                    <ListItemText primary="Functional Group List" />
                  </Link>
                </ListItem> 
            </List>
          </AccordionDetails>
        </Accordion>

        {/* ACCOUNT */}
        <Accordion
          className="bg-[#252631] text-white"
          style={{ background: "#252631" }}
        >
          <AccordionSummary
            className="m-0"
            expandIcon={<ExpandMoreIcon className="text-white m-0" />}
          >
            <ListItemText
              className="m-0"
              primary={
                <Typography variant="p" color="white" className="text-base">
                  ACCOUNT
                </Typography>
              }
            />
          </AccordionSummary>
          <AccordionDetails>
            <List component="div" disablePadding>
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/account/type"
                  passHref
                >
                  <ListItemText primary="Account Type" />
                </Link>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Opp PRE-REQUISITES */}
        <Accordion
          className="bg-[#252631] text-white"
          style={{ background: "#252631" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="text-white" />}
          >
            <ListItemText
              primary={
                <Typography variant="p" color="white" className="text-base">
                  OPPORTUNITY
                </Typography>
              }
            />
          </AccordionSummary>
          <AccordionDetails>
            <List component="div" disablePadding>
              {/* <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/opportunity/opportunity-currency"
                  passHref
                >
                  <ListItemText primary="Opportunity Currency" />
                </Link>
              </ListItem> */}
               <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/opportunity/opportunity-sales-stages"
                  passHref
                >
                  <ListItemText primary="Opportunity Sales Stages" />
                </Link>
              </ListItem>
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/opportunity/sales-pursuit-progress"
                  passHref
                >
                  <ListItemText primary="Sales Pursuit Progress" />
                </Link>
              </ListItem>
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/opportunity/business-line"
                  passHref
                >
                  <ListItemText primary="Business Line" />
                </Link>
              </ListItem>
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/opportunity/opportunity-committed-for-sales-budget"
                  passHref
                >
                  <ListItemText primary="opportunity Committed for Sales Budget" />
                </Link>
              </ListItem> 
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/opportunity/bidding-unit"
                  passHref
                >
                  <ListItemText primary="Bidding Unit" />
                </Link>
              </ListItem> 
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/opportunity/project-type"
                  passHref
                >
                  <ListItemText primary="Project Type" />
                </Link>
              </ListItem>
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/opportunity/opportunity-type"
                  passHref
                >
                  <ListItemText primary="Opportunity Type" />
                </Link>
              </ListItem>
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/opportunity/opportunity-industry"
                  passHref
                >
                  <ListItemText primary="Opportunity Industry" />
                </Link>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>


        {/* RFX PRE-REQUISITES */}
        <Accordion
          className="bg-[#252631] text-white"
          style={{ background: "#252631" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="text-white" />}
          >
            <ListItemText
              primary={
                <Typography variant="p" color="white" className="text-base">
                  RFX
                </Typography>
              }
            />
          </AccordionSummary>
          <AccordionDetails>
            <List component="div" disablePadding>
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/rfx/bid-validity"
                  passHref
                >
                  <ListItemText primary="Bid Validity" />
                </Link>
              </ListItem>
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/rfx/rfx-type"
                  passHref
                >
                  <ListItemText primary="Rfx Type" />
                </Link>
              </ListItem>
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/rfx/rfx-content-submission"
                  passHref
                >
                  <ListItemText primary="RFx Content Submission" />
                </Link>
              </ListItem>
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/rfx/rfx-submission-mode"
                  passHref
                >
                  <ListItemText primary="RFx Submission Mode" />
                </Link>
              </ListItem>
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/rfx/rfx-stage"
                  passHref
                >
                  <ListItemText primary="RFx Stage" />
                </Link>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* CUSTOMERS */}
        {/* {<Accordion className="bg-[#252631] text-white" style={{background:"#252631"}}>
					<AccordionSummary expandIcon={<ExpandMoreIcon className="text-white" />}>
						<ListItemText primary={<Typography variant="p" color="white" className="text-base">CUSTOMERS</Typography>} />
					</AccordionSummary>
					<AccordionDetails>
						<List component="div" disablePadding>
							<ListItem  className="py-0 text-[#cecece]">
								<Link className="no-underline text-[#cecece]" href="/admin-panel/customers" passHref>
									<ListItemText primary="Customers" />
								</Link>
							</ListItem>
							<ListItem  className="py-0 text-[#cecece]">
								<Link className="no-underline text-[#cecece]" href="/admin-panel/opportunities" passHref>
									<ListItemText primary="Opportunities" />
								</Link>
							</ListItem>
						</List>
					</AccordionDetails>
				</Accordion>} */}

        {/* STAGES */}
        <Accordion
          className="bg-[#252631] text-white"
          style={{ background: "#252631" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="text-white" />}
          >
            <ListItemText
              primary={
                <Typography variant="p" color="white" className="text-base">
                  STAGES
                </Typography>
              }
            />
          </AccordionSummary>
          <AccordionDetails>
            <List component="div" disablePadding>
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/phase/rfx-stages"
                  passHref
                >
                  <ListItemText primary="Rfx Stages" />
                </Link>
              </ListItem>
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/phase/bid-stages"
                  passHref
                >
                  <ListItemText primary="Bid Staages" />
                </Link>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* TEMPLATES */}
        <Accordion
          className="bg-[#252631] text-white"
          style={{ background: "#252631" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="text-white" />}
          >
            <ListItemText
              primary={
                <Typography variant="p" color="white" className="text-base">
                  TEMPLATES
                </Typography>
              }
            />
          </AccordionSummary>
          <AccordionDetails>
            <List component="div" disablePadding>
              <ListItem  className="py-0 text-[#cecece]">
                <Link
                  className="no-underline text-[#cecece]"
                  href="/admin-panel/template-builder"
                  passHref
                >
                  <ListItemText primary="Create a Template" />
                </Link>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Misc */}
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="subtitle1" className="fw-medium mt-4">
                Misc
              </Typography>
            }
          />
        </ListItem>
      </List>
      );
    </aside>
  );
}
