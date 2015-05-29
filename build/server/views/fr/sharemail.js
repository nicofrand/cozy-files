var jade = require('jade/runtime');
module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (displayEmail, displayName, doc, localization, rule, type, url) {
buf.push("<!DOCTYPE html><html><head><meta name=\"viewport\" content=\"width=device-width\"><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"></head><body><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"padding:1.5em 0.5em; background-color: #F4F4F4; font-family: Helvetica,Arial,Verdana,sans-serif; color: #333; font-size: 0.9em; line-height: 1.6;\"><tr><td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"margin: auto; width: 100%; max-width: 600px; background-color: #FFF; border-radius: 8px; border: 1px solid #DDD;\"><tr><th style=\"border-radius: 8px 8px 0 0; border-bottom: 1px solid #DDD;\"><img src=\"http://cozy.io/assets/images/cozy-logo-gradient.svg\" width=\"63\" height=\"48\" style=\"padding: 12px 0; margin: auto;\"></th></tr><tr><td style=\"padding: 1.5em;\">" + (jade.escape((jade_interp = displayName) == null ? '' : jade_interp)) + " (" + (jade.escape((jade_interp = displayEmail) == null ? '' : jade_interp)) + ") a partagé le \"" + (jade.escape((jade_interp = doc.name) == null ? '' : jade_interp)) + "\" " + (jade.escape((jade_interp = localization.t(type)) == null ? '' : jade_interp)) + " avec vous via Cozy Cloud.</td></tr><tr><td style=\"padding: 0.5em 1.5em; width: 100%;\"><a" + (jade.attr("href", url, true, true)) + " style=\"display: block; width: 60%; margin: 0 auto; padding: 1.2em 2em; background-color: #34A6FF; border-radius: 5px; color: #FFF; text-decoration: none; text-align: center; font-size: 1em; font-weight: bold; cursor:pointer;\">" + (jade.escape((jade_interp = localization.t('link ' + type + ' content')) == null ? '' : jade_interp)) + ".</a></td></tr>");
if ( type == 'folder')
{
buf.push("<tr><td style=\"padding: 1.5em; color: #999;\">Vous pouvez:<ul style=\"margin: 0;\"><li>Télécharger les fichiers de ce dossier</li>");
if ( type == 'folder' && rule.perm == 'rw')
{
buf.push("<li>Ajouter des fichiers à ce dossier</li>");
}
buf.push("<li>Vous abonner aux notifications de changement de ce dossier</li></ul></td></tr>");
}
buf.push("</table></td></tr><tr style=\"padding-top: 10px; text-align: center; font-size: 0.85em; font-style: italic; color: #999;\"><td><p>Envoyé depuis le&nbsp;<a href=\"http://cozy.io\" style=\"color: #34A6FF; text-decoration: none;\">Cozy de " + (jade.escape((jade_interp = displayName) == null ? '' : jade_interp)) + "</a>.</p></td></tr></table></body></html>");}.call(this,"displayEmail" in locals_for_with?locals_for_with.displayEmail:typeof displayEmail!=="undefined"?displayEmail:undefined,"displayName" in locals_for_with?locals_for_with.displayName:typeof displayName!=="undefined"?displayName:undefined,"doc" in locals_for_with?locals_for_with.doc:typeof doc!=="undefined"?doc:undefined,"localization" in locals_for_with?locals_for_with.localization:typeof localization!=="undefined"?localization:undefined,"rule" in locals_for_with?locals_for_with.rule:typeof rule!=="undefined"?rule:undefined,"type" in locals_for_with?locals_for_with.type:typeof type!=="undefined"?type:undefined,"url" in locals_for_with?locals_for_with.url:typeof url!=="undefined"?url:undefined));;return buf.join("");
}