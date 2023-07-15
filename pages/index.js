import Layout from "@/components/common/Layout";
import { fetcher } from "@/helpers/helpScripts";
export default function Index() {

  const upload = async (e) => {
    e.preventDefault();
    await fetcher(
      'upload',
      '',
      {
        method: 'post',
        body: new FormData(e.target)
      }
    )
    // FIXME: Later this function needs a reload of the page and a success Alert
  }

  return (
    <Layout nopageHeader>
      <form onSubmit={(e) => upload(e)}>
        <input type="file" name="files" />
        <input type="text" name="ref" value="api::cert-document.cert-document" />
        <input type="text" name="refId" value="1" />
        <input type="text" name="field" value="document" />
        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    </Layout>
  );
}