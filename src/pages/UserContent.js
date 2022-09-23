import ContentHeader from "../MainComponents/Content/ContentHeader";
import UserAdd from "../MainComponents/Content/MainContentModules/components/Forms/User/UserAdd";
import CardUsersTable from "../MainComponents/Content/MainContentModules/components/CardTable/CardUsersTable/CardUsersTable";

export const UserContent = () => {
  return (
    <>
      <div className="content-wrapper">
        <ContentHeader name="Khách hàng" />
        <section className="col-lg-12">
          <UserAdd />
        </section>
        <section className="col-lg-12">
          <CardUsersTable />
        </section>
      </div>
    </>
  );
};
