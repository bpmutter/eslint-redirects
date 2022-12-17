/** POJO representation of [Netlify redirect](https://docs.netlify.com/routing/redirects/)
 * as used in eslint.org.
*/
interface Redirect {
  from: string;
  to: string;
  /** Can be any HTTP status code, but in this file only 301 */
  status: string;
}